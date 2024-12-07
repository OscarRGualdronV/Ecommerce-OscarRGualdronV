import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadPipe } from '../pipes/image-upload/image-upload.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Este endpoint permite crear un nuevo producto en el sistema. Los datos del producto se proporcionan en el DTO de creación.'
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos proporcionados.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }


  @ApiOperation({
    summary: 'Obtener todos los productos',
    description: 'Este endpoint permite obtener una lista de productos, con paginación opcional.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de paginación inválidos.',
  })
  @Get()
  @HttpCode(200)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ) {
    const pageNumber = Math.max(1, page || 1);
    const limitNumber = Math.min(Math.max(1, limit || 5), 100);
    return this.productsService.findAll({ page: pageNumber, limit: limitNumber });
  }


  @ApiOperation({
    summary: 'Obtener producto por ID',
    description: 'Este endpoint permite obtener los detalles de un producto mediante su ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles del producto obtenidos correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar producto',
    description: 'Este endpoint permite actualizar los datos de un producto existente en el sistema.'
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos proporcionados.',
  })
  @Patch(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Este endpoint permite eliminar un producto utilizando su ID.'
  })
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string): Promise<{ id: string }> {
    return await this.productsService.remove(id);
  }


  @ApiOperation({
    summary: 'Subir imagen de producto',
    description: 'Este endpoint permite subir una imagen a Cloudinary para asociarla con un producto existente.'
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en el archivo de imagen proporcionado.',
  })
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Query('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    return this.productsService.uploadFile(file, id);
  }

}
