import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { Product } from "src/products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [],
    exports: [],
}) 

export class SeedsModule {}