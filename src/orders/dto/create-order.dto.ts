import { ArrayNotEmpty, IsArray , IsNotEmpty, IsUUID } from "class-validator";


export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', {each: true})
    products: string[];
}
