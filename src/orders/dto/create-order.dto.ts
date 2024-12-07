import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray , IsNotEmpty, IsUUID } from "class-validator";


export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'UUID del usuario que realiza el pedido.',
        type: String,
        format: 'uuid',
        example: 'a3e1a8f7-1e4f-4e0d-9d30-fb0a3e6a2b65',
    })
    userId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', {each: true})
    @ApiProperty({
        description: 'Lista de UUIDs de los productos incluidos en el pedido.',
        type: [String],
        example: ['a1b2c3d4-e5f6-7g8h-9i0j-klmnopqrstuv', 'w1x2y3z4-a5b6-c7d8-e9f0-ghijklmnopqr'],
    })
    products: string[];
}
