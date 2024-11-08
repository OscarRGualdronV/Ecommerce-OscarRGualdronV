import { IsBoolean, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @Length(3, 150, { message: 'El nombre debe tener entre 3 y 150 caracteres' })
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    stock: boolean;

    @IsString()
    imgUrl: string;
}
