import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from 'src/common/guards/jwt/jwt.guard';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }


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

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string): Promise<{ id: string }> {
    return await this.productsService.remove(id);
  }
}
