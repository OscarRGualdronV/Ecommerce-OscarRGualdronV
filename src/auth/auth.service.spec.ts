import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';


jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUserService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('yourSecretKey'), 
  };



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService)
  });

  describe('signIn', () => {
    it('should throw an error if user does not exist', async () => {
      const signInDto: SigninDto = { email: 'test@example.com', password: 'password' };
      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        new HttpException('User does not exist', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an error if password is incorrect', async () => {
      const signInDto: SigninDto = { email: 'test@example.com', password: 'password' };
      const mockUser = { id: '1', email: 'test@example.com', password: 'hashedPassword' };
      mockUserService.findByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); 

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        new HttpException('Incorrect password provided', HttpStatus.UNAUTHORIZED),
      );
    });

  });
});
