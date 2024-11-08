import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SigninDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: 'La contraseña debe tener al menos 8 caracteres, al menos una letra, un número y un caracter especial (@$!%*#?&)'} )
    @IsString()   
    @IsNotEmpty()
    password: string;
}