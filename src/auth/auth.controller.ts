import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/users/enum/rol.enum';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Este endpoint permite a un usuario iniciar sesión con su correo electrónico y contraseña.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Credenciales incorrectas.',
  })
  @Post('signin')
  async signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto);
  }


  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Este endpoint permite registrar un nuevo usuario en el sistema con su información de inicio de sesión.'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de registro incorrectos o ya existentes.',
  })
  @ApiBody({ type: SignupDto })
  @Post('signup')
  async signUp(@Body() signUpDto: SignupDto) {
    const createdUser = await this.authService.signUp(signUpDto);
    return {
      message: 'User created successfully',
      user: createdUser,
    };
  }
}
