import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SigninDto {
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Correo electrónico del usuario, registrada en la app',
        type: String,
        example: 'juan.perez@example.com'
    })
    email: string;

    @IsString()   
    @IsNotEmpty()
    @ApiProperty({
        description: 'Contraseña del usuario, registrado en la app',
        type: String,
        example: 'Secure123!'
    })
    password: string;

    constructor(partial: Partial<SigninDto>) {
        Object.assign(this, partial);
    }
}