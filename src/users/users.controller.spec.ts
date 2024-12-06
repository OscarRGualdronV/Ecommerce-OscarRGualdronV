import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

const mockUserId = uuidv4();



describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    getAllUsers: jest.fn(),
    finById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('secret-key'), 
  };

  const mockJwtGuard = {
    canActivate: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: UsersService,useValue: mockUsersService},
        {provide: JwtGuard, useValue: mockJwtGuard},
        {provide: JwtService, useValue: mockJwtService},
        {provide: ConfigService, useValue: mockConfigService},],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        address: 'Calle 123',
        phone: 123456789,
        country: 'Colombia',
        city: 'Bogota',

      };
      const mockUser = { id: mockUserId, ...createUserDto };

      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const mockUsers = [{ id: mockUserId, name: 'Test User' }];
      mockUsersService.getAllUsers.mockResolvedValue(mockUsers);
  
      const result = await controller.findAll(1, 5);
      
      expect(mockUsersService.getAllUsers).toHaveBeenCalledWith(1, 5);
      expect(result).toEqual(mockUsers);
    });
  });
  

});
