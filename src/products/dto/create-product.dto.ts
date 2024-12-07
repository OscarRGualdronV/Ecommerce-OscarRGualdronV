import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID, Length } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @Length(3, 150, { message: 'El nombre debe tener entre 3 y 150 caracteres' })
    @ApiProperty({
        description: 'Nombre del producto. Debe tener entre 3 y 150 caracteres.',
        type: String,
        example: 'Smartphone XYZ',
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'Descripción detallada del producto.',
        type: String,
        example: 'Un smartphone con pantalla OLED y cámara de alta resolución.',
    })
    description: string;

    @IsNumber()
    @ApiProperty({
        description: 'Precio del producto en la moneda local.',
        type: Number,
        example: 299.99,
    })
    price: number;

    @IsNumber()
    @ApiProperty({
        description: 'Cantidad de unidades disponibles en stock.',
        type: Number,
        example: 50,
    })
    stock: number;

    @IsUUID()
    @ApiProperty({
        description: 'UUID de la categoría a la que pertenece el producto.',
        type: String,
        format: 'uuid',
        example: 'f0e1d2c3-b4a5-6789-0123-abcdefabcdef',
    })
    categoryId: string;

    @IsString()
    @ApiProperty({
        description: 'URL de la imagen del producto.',
        type: String,
        example: 'https://example.com/images/producto.jpg',
    })
    imgUrl: string;
}
