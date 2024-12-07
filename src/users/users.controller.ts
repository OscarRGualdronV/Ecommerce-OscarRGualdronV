import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from './enum/rol.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo usuario',
    description: 'Este endpoint permite crear un nuevo usuario. Los campos requeridos son los definidos en el DTO de creación de usuario.'
  })
  @ApiResponse({
    status: 201,
    description: 'El usuario se ha creado correctamente.'
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validacion o datos invalidos.'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Este endpoint requiere que el usuario tenga el rol de administrador.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente.'
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, se requiere rol de administrador.'
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado, rol insuficiente.',
  })
  @Get()
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const pageNumber = Math.max(1, page || 1);
    const limitNumber = Math.min(Math.max(1, limit || 5), 100);

    return this.usersService.getAllUsers(pageNumber, limitNumber);
  }


  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener usuario por ID',
    description: 'Este endpoint permite obtener los detalles de un usuario específico utilizando su ID. Requiere autenticación.'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles del usuario obtenidos correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.finById(id);
  }


  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar información del usuario',
    description: 'Este endpoint permite actualizar la información de un usuario registrado. Solo los administradores pueden realizar esta operación.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o no proporcionados.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Patch(':id')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Este endpoint permite eliminar un usuario por su ID. Solo los administradores pueden realizar esta operación.'
  })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
