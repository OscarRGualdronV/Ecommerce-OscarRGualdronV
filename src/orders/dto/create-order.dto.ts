import { ArrayNotEmpty, IsArray , IsNotEmpty, IsUUID } from "class-validator";

// export interface ProductId {
//     id: string;
// }
export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', {each: true})
    products: {id: string}[];
}
