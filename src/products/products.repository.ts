import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CategoryService } from "src/category/category.service";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { UploadFileDto } from "src/file-upload/dto/upload.file.dto";

@Injectable()
export class ProductsRepository {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly categoryService: CategoryService,
        private readonly fileUploadService: FileUploadService,
    ) {}

    async getAllProducts(page: number = 1, limit: number = 5) {
        return await this.paginate({ page, limit });
    }

    async getProductById(id: string) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async remove(id: string): Promise<{ id: string }> {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productsRepository.remove(product);
        return { id };
    }

    async create(createProductDto: CreateProductDto){
        const category = await this.categoryService.getCategoryById(createProductDto.categoryId);
        if(!category){
            throw new NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
        }
        const newProduct = this.productsRepository.create(createProductDto);
        newProduct.category = category;
        await this.productsRepository.save(newProduct);
        return newProduct;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        if(updateProductDto.categoryId){
            const category = await this.categoryService.getCategoryById(updateProductDto.categoryId);
            if(!category){
                throw new NotFoundException(`Category with ID ${updateProductDto.categoryId} not found`);
            }
        }

        await this.productsRepository.update(id, updateProductDto);
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async paginate({ page, limit }: { page: number; limit: number }) {
        const [data, totalCount] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
    
        return {
            data,
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
        };
    }

    async uploadFile(file: UploadFileDto, id: string){
        const url = await this.fileUploadService.uploadFile({
            fieldname: file.fieldname,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer
        });
        await this.productsRepository.update(id, ({ imgUrl: url }));
        return {imgUrl: url};
    }
}