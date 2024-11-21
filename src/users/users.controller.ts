import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpCode, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/common/guards/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtGuard)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const pageNumber = Math.max(1, page || 1);
    const limitNumber = Math.min(Math.max(1, limit || 5), 100);

    return this.usersService.findAll({ page: pageNumber, limit: limitNumber });
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
