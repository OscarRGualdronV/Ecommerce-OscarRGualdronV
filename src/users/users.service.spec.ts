import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';


const mockUserId = uuidv4();

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  const mockUserRepository = {
    create: jest.fn(),
    getAllUsers: jest.fn(),
    finById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {provide: UsersRepository, useValue: mockUserRepository},
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        address: '123 Main St',
        phone: 1234567890,
        country: 'United States',
        city: 'New York',
      };
      const mockUser: User = { id: mockUserId, ...createUserDto } as User;

      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const mockPagination = {
        data: [],
        page: 1,
        limit: 5,
        totalCount: 0,
        totalPages: 0,
      };

      mockUserRepository.getAllUsers.mockResolvedValue(mockPagination);

      const result = await service.findAll({ page: 1, limit: 5 });

      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(1, 5);
      expect(result).toEqual(mockPagination);
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const mockUser: User = {
        id: mockUserId,
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      } as User;

      mockUserRepository.finById.mockResolvedValue(mockUser);

      const result = await service.findOne(mockUserId);

      expect(mockUserRepository.finById).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      const mockUser: User = {
        id: mockUserId,
        email: 'test@example.com',
        password: 'password',
        name: 'Updated User',
      } as User;

      mockUserRepository.update.mockResolvedValue(mockUser);

      const result = await service.update(mockUserId, updateUserDto);

      expect(mockUserRepository.update).toHaveBeenCalledWith(mockUserId, updateUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const mockUser: User = {
        id: mockUserId,
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      } as User;

      mockUserRepository.remove.mockResolvedValue(mockUser);

      const result = await service.remove(mockUserId);

      expect(mockUserRepository.remove).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });
  });
});
