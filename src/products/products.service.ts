import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { UploadFileDto } from '../file-upload/dto/uploadFileDto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    private productsRepository: ProductsRepository
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.create(createProductDto);
  }

  async findAll(paginationParams: {
    page?: number;
    limit?: number;}) {
    const { page = 1, limit = 5 } = paginationParams;
    return await this.productsRepository.getAllProducts(page, limit);
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.getProductById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsRepository.update(id, updateProductDto); 
  }

  async remove(id: string): Promise<{ id: string }> {
    return this.productsRepository.remove(id)
  }

  async uploadFile(file: UploadFileDto, id: string): Promise<{ imgUrl: string }> {
    return this.productsRepository.uploadFile(file, id)
  }

}
