import { ApiProperty } from "@nestjs/swagger";
import { IsEmail , IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
    @ApiProperty({
        description: 'Nombre completo del usuario.',
        type: String,
        minLength: 3,
        maxLength: 80,
        example: 'Juan Pérez',
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Correo electrónico del usuario.',
        type: String,
        format: 'email',
        example: 'juan.perez@example.com',
    })
    email: string;

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: 'La contraseña debe tener al menos 8 caracteres, al menos una letra, un número y un caracter especial (@$!%*#?&)'} )
    @IsString()
    @ApiProperty({
        description:
        'Contraseña del usuario. Debe contener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial.',
        type: String,
        example: 'Secure123!',
    })   
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Confirmación de la contraseña del usuario. Debe coincidir con el campo "password".',
        type: String,
        example: 'Secure123!',
    })
    passwordConfirm: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
    @ApiProperty({
        description: 'Dirección completa del usuario.',
        type: String,
        minLength: 3,
        maxLength: 80,
        example: 'Calle Falsa 123, Piso 4, Departamento 5B',
    })
    address: string;

    @IsNumber({}, { message: 'El teléfono debe ser un número válido' })
    @IsNotEmpty()
    @ApiProperty({
        description: 'Número de teléfono del usuario.',
        type: Number,
        example: 987654321,
    })
    phone: number;

    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: 'El país debe tener entre 3 y 20 caracteres' })
    @ApiProperty({
        description: 'País de residencia del usuario.',
        type: String,
        minLength: 3,
        maxLength: 50,
        example: 'México',
    })
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 50, { message: 'La ciudad debe tener entre 3 y 20 caracteres' })
    @ApiProperty({
        description: 'Ciudad de residencia del usuario.',
        type: String,
        minLength: 3,
        maxLength: 50,
        example: 'Guadalajara',
    })
    city: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Fecha de creación del registro del usuario.',
        type: String,
        format: 'date-time',
        example: '2024-12-06',
        required: false,
    })
    createdAt: string;

    constructor(partial: Partial<SignupDto>) {
        Object.assign(this, partial);
    }
}
