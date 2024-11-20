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

  findAll(paginationParams: {
    page?: number;
    limit?: number;}) {
    const { page = 1, limit = 5 } = paginationParams;
    return this.productsRepository.getAllProducts(page, limit);
  }

  findOne(id: string) {
    return this.productsRepository.getProductById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto); 
  }

  async remove(id: string): Promise<{ id: string }> {
    return this.productsRepository.remove(id)
  }
}
