import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInUser: SigninDto) {
    const user = await this.usersRepository.findByEmail(signInUser.email)
    if(!user){
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
    }

    const isPasswordMatching = await bcrypt.compare(
      signInUser.password,
      user.password
    );

    if(!isPasswordMatching){
      throw new HttpException('Wrong credentials provided',HttpStatus.UNAUTHORIZED)
    }

    const token = await this.createToken(user)
    return { token };
  }

  async singUp(signUpUser: SignupDto) {
    if(signUpUser.password !== signUpUser.passwordConfirm){
      throw new HttpException('Passwords do not match',400);
    }

    signUpUser.password = await bcrypt.hash(signUpUser.password, 10);
    return await this.usersRepository.create(signUpUser)
  }
  
  private async createToken(user: User){
    const payload = {
      id: user.id,
      email: user.email
    }
    return this.jwtService.signAsync(payload)
  }

}
