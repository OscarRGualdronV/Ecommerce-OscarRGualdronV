import { IsEmail , IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class SignupDto {
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

    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
    address: string;

    @IsNumber({}, { message: 'El teléfono debe ser un número válido' })
    @IsNotEmpty()
    phone: number;

    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: 'El país debe tener entre 3 y 20 caracteres' })
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: 'La ciudad debe tener entre 3 y 20 caracteres' })
    city: string;

    @IsString()
    @IsOptional()
    createdAt: string;

    constructor(partial: Partial<SignupDto>) {
        Object.assign(this, partial);
    }
}
