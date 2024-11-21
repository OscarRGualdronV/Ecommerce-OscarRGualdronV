import { IsNumber, IsString, IsUUID, Length } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @Length(3, 150, { message: 'El nombre debe tener entre 3 y 150 caracteres' })
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsUUID()
    categoryId: string;

    @IsString()
    imgUrl: string;
}
