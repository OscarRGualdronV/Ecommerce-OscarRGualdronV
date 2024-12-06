import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../category/entities/category.entity";
import { Product } from "../products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [],
    exports: [],
}) 

export class SeedsModule {}