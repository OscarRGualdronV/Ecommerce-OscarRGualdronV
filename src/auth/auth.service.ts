import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { SigninDto } from './dto/signin.dto';


@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  async signIn(signInDto: SigninDto) {
    const user = await this.userRepository.findByEmail(signInDto.email);
    if (user &&user.password === signInDto.password) {
      return "Login successful";
    }
    return "Invalid credentials";
  }
  

}
