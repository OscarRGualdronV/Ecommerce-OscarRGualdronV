import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async singUp(@Body() signUpDto: SignupDto) {
    const user = await this.authService.singUp(signUpDto);
    return {
      message: 'User created successfully',
      user
    };
  }

}
