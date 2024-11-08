import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

  constructor(
    private productsRepository: ProductsRepository
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  findAll() {
    return this.productsRepository.getAllProducts();
  }

  findOne(id: number) {
    return this.productsRepository.getProductById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto); 
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
