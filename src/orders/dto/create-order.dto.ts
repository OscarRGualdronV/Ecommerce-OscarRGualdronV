import { IsArray , IsUUID } from "class-validator";

// export interface ProductId {
//     id: string;
// }
export class CreateOrderDto {
    @IsUUID()
    userId: string;

    @IsArray()
    @IsUUID('all', {each: true})
    products: {id: string}[];
}
