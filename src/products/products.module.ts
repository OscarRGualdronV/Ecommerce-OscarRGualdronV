import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsSeed } from '../seeds/products/products.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CategoriesSeed } from '../seeds/categories/categories.seed';
import { CategoryService } from '../category/category.service';

import { CloudinaryService } from '../service/cloudinary/cloudinary.service';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), FileUploadModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductsSeed, 
    CategoriesSeed, CategoryService,CloudinaryService, FileUploadService],
})
export class ProductsModule {}
