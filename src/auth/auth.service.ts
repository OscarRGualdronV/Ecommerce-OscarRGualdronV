import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInUser: SigninDto): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(signInUser.email)
    if(!user){
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
    }

    const isPasswordMatching = await bcrypt.compare(
      signInUser.password,
      user.password
    );

    if(!isPasswordMatching){
      throw new HttpException('Incorrect password provided',HttpStatus.UNAUTHORIZED)
    }

    const token = await this.createToken(user)
    return { token };
  }

  async signUp(signUpUser: SignupDto):Promise<User> {
    if(signUpUser.password !== signUpUser.passwordConfirm){
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userService.findByEmail(signUpUser.email);
    if(existingUser){
      throw new HttpException('Email is already registered', HttpStatus.BAD_REQUEST);
    }

    delete signUpUser.passwordConfirm;

    signUpUser.password = await bcrypt.hash(signUpUser.password, 10);
    return this.userService.create(signUpUser)
  }
  
  private async createToken(user: User){
    const payload = {
      id: user.id,
      email: user.email,
      administrador: user.administrador
    }
    return this.jwtService.signAsync(payload)
  }

}
