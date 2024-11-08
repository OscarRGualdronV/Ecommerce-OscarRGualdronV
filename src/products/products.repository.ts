import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsRepository {

    private products = {
        data : [
            {
                id: 1,
                name: "Laptop Pro 15",
                description: "High-performance laptop with a 15-inch display, suitable for professional work.",
                price: 1299.99,
                stock: true,
                imgUrl: "https://example.com/images/laptop-pro-15.jpg"
            },
            {
                id: 2,
                name: "Wireless Headphones",
                description: "Noise-canceling over-ear headphones with up to 20 hours of battery life.",
                price: 199.99,
                stock: true,
                imgUrl: "https://example.com/images/wireless-headphones.jpg"
            },
            {
                id: 3,
                name: "4K Monitor 27\"",
                description: "27-inch 4K UHD monitor with vivid colors and high dynamic range.",
                price: 349.99,
                stock: false,
                imgUrl: "https://example.com/images/4k-monitor.jpg"
            },
            {
                id: 4,
                name: "Mechanical Keyboard",
                description: "Compact mechanical keyboard with RGB backlighting and customizable keys.",
                price: 89.99,
                stock: true,
                imgUrl: "https://example.com/images/mechanical-keyboard.jpg"
            },
            {
                id: 5,
                name: "Smartphone Case",
                description: "Durable, shockproof case designed for a wide range of smartphone models.",
                price: 19.99,
                stock: false,
                imgUrl: "https://example.com/images/smartphone-case.jpg"
            }
        ]
    };

    async getAllProducts() {
        return this.products.data;
    }

    async getProductById(id: number) {
        const product = this.products.data.find((product) => product.id === id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }

    async remove(id: number) {
        const product = await this.getProductById(id);
        this.products.data = this.products.data.filter((product) => product.id !== id);
        return product;
    }

    async create(CreateProductDto: CreateProductDto) {
        const newProduct = {
            id: this.products.data.length + 1,
            ...CreateProductDto
        };
        this.products.data.push(newProduct);
        return newProduct;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.getProductById(id);
        const updatedProduct = {
            ...product,
            ...updateProductDto
        };
        this.products.data = this.products.data.map((product) => {
            if (product.id === id) {
                return updatedProduct;
            }
            return product;
        });
        return updatedProduct;
    }
}