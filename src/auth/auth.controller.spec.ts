import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { hash } from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { v4 as uuidv4 } from 'uuid';


const mockUserId = uuidv4();

describe('AuthController', () => {
  let controller: AuthController;
  let usersRepositoryMock: Partial<UsersRepository>;

  beforeEach(async () => {
    const hashedPassword = await hash('123456', 10);
    usersRepositoryMock = {
      findByEmail: jest.fn().mockImplementation((email: string) => {
        if (email === 'M2Qr2@example.com') {
          return Promise.resolve({
            email: 'M2Qr2@example.com',
            password: hashedPassword,
            administrador: 'user',
          } as User);
        } else {
          return Promise.resolve(undefined);
        }
      }),
      create: jest.fn().mockResolvedValue({
        administrador: 'user',
        id: mockUserId,
      } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UsersRepository, useValue: usersRepositoryMock }, 
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: JwtService, useValue: { signAsync: () => Promise.resolve('mockedToken') } }, 
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('singUp() should return a new UserDto and create User', async () => {

    const mockUserDto = new SignupDto({
      name: 'Juan Constantine',
      email: 'test@example.com',
      password: 'Pass5678$',
      passwordConfirm: 'Pass5678$',
      address: 'Calle 123',
      phone: 123456789,
      country: 'Colombia',
      city: 'Bogota',
      createdAt: '26/02/2024',
    });
  
    const createdUser = {
      id: mockUserId,
      name: mockUserDto.name,
      email: mockUserDto.email,
      address: mockUserDto.address,
      phone: mockUserDto.phone,
      country: mockUserDto.country,
      city: mockUserDto.city,
      administrador: 'user',
      password: 'hashedPassword', 
      orders: [], 
    } as User;

    jest.spyOn(controller['authService'], 'singUp').mockResolvedValue(createdUser);

    const response = await controller.singUp(mockUserDto);

    expect(response).toBeDefined();
    expect(response).toHaveProperty('message', 'User created successfully');
    expect(response).toHaveProperty('user');
    expect(response.user).toHaveProperty('id', createdUser.id);
    expect(response.user).toHaveProperty('email', createdUser.email);
    expect(response.user).toHaveProperty('password');
  })

  it('signIn() should return a token', async () => {

    const mockSinginDto = new SigninDto({
      email: 'M2Qr2@example.com',
      password: 'Pass5678$',
    });

    const mockToken = {
      token: 'mockedToken',
    };

    jest.spyOn(controller['authService'], 'signIn').mockResolvedValue(mockToken);
    const response = await controller.signIn(mockSinginDto);

    expect(response).toBeDefined();
    expect(response).toHaveProperty('token', mockToken.token);
    expect(controller['authService'].signIn).toHaveBeenCalledTimes(1);
  })
});
