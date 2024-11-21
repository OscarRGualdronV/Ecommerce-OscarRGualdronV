import { IsEmail , IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: 'La contraseña debe tener al menos 8 caracteres, al menos una letra, un número y un caracter especial (@$!%*#?&)'} )
    @IsString()   
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
    address: string;

    @IsNumber()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20, { message: 'El país debe tener entre 3 y 20 caracteres' })
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20, { message: 'La ciudad debe tener entre 3 y 20 caracteres' })
    city: string;
}
