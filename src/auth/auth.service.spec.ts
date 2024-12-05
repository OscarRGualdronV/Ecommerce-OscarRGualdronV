import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { Role } from 'src/users/enum/rol.enum';
import { v4 as uuidv4 } from 'uuid';

const mockUserId = uuidv4();

describe('AuthService', () => {
  let service: AuthService;
  let usersRepositoryMock: Partial<UsersRepository>;

  beforeEach(async () => {

    usersRepositoryMock = {
      findByEmail: () => Promise.resolve(undefined),
      create: (entityLike?: Partial<User>) => 
        Promise.resolve({
          ...entityLike,
          administrador: Role.USER,
          id: mockUserId
        } as User),
    };


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: UsersRepository, useValue: usersRepositoryMock},
        {provide: JwtService, useValue: {}}, 
        {provide: getRepositoryToken(User), useValue: {}},       
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser = new SignupDto({
    name: 'Juan Constantine',
    email: 'M2Qr2@example.com',
    password: 'Pass5678$',
    passwordConfirm: 'Pass5678$',
    address: 'Calle 123',
    phone: 123456789,
    country: 'Colombia',
    city: 'Bogota',
    createdAt: '26/02/2024',
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('singUp() create a new user with encrypted password', async () => {
    const user = await service.singUp(mockUser);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('administrador', Role.USER);
    expect(user).toHaveProperty('password');
  })
});
