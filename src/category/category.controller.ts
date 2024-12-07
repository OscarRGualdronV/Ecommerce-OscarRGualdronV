import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../users/enum/rol.enum';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { RolesGuard } from '../common/guards/roles/roles.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @ApiOperation({
    summary: 'Obtener categoría por ID',
    description: 'Este endpoint permite obtener una categoría específica por su ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  @Get()
  findById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva categoria' })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente.',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de categoría inválidos.',
  })
  async createCategory(
    @Body() createCategory: CreateCategoryDto){
    return this.categoryService.createCategory(createCategory);
  }

}
