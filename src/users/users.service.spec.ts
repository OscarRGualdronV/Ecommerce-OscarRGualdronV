import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';


const mockUserId = uuidv4();

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,  
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User)); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return a paginated list of users', async () => {
      const mockUsers = [{ id: mockUserId, name: 'John Doe', email: 'john@example.com' }];
      const totalCount = 1;
      mockUserRepository.findAndCount.mockResolvedValue([mockUsers, totalCount]);

      const result = await service.getAllUsers(1, 5);
      expect(result).toEqual({
        data: mockUsers,
        page: 1,
        limit: 5,
        totalCount,
        totalPages: 1,
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        address: '123 Main St',
        phone: 1234567890,
        country: 'United States',
        city: 'New York',
      };
      const newUser = { id: mockUserId, ...createUserDto };
      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(newUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const mockUser = { id: mockUserId, name: 'John Doe', email: 'john@example.com' };
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findByEmail('john@example.com');
      expect(result).toEqual(mockUser);
    });
  });
});
