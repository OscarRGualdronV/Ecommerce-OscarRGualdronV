import { IsEmail , IsPhoneNumber, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
    name: string;

    @IsEmail()
    email: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: 'La contraseña debe tener al menos 8 caracteres, al menos una letra, un número y un caracter especial (@$!%*#?&)'} )
    @IsString()   
    password: string;

    @IsString()
    address: string;

    @IsPhoneNumber("CO")
    @IsString()
    phone: string;

    @IsString()
    country: string;

    @IsString()
    city: string;
}
