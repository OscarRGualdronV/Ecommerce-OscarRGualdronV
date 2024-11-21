import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsSeed } from 'src/seeds/products/products.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoriesSeed } from 'src/seeds/categories/categories.seed';
import { CategoryService } from 'src/category/category.service';

import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), FileUploadModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductsSeed, 
    CategoriesSeed, CategoryService,CloudinaryService, FileUploadService],
})
export class ProductsModule {}
