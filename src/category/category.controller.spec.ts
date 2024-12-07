import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';


const mockUserId = uuidv4();


describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    getCategoryById: jest.fn(),
  }

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
      controllers: [CategoryController],
      providers: [
        {provide: CategoryService,useValue: mockCategoryService},
        {provide: JwtService,useValue: mockJwtService},
        {provide: ConfigService,useValue: mockConfigService},
        {provide: JwtGuard,useValue: mockJwtGuard},],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategoryById', () => {
    it('should return a category if found', async () => {
      const category = { id: mockUserId, name: 'Test Category' };
      mockCategoryService.getCategoryById.mockResolvedValue(category);

      const result = await controller.findById(mockUserId);
      expect(result).toEqual(category);
      expect(mockCategoryService.getCategoryById).toHaveBeenCalledWith(mockUserId);
    })

    it('should throw NotFoundException if category not found', async () => {
      mockCategoryService.getCategoryById.mockRejectedValue(new NotFoundException(`Category with id ${mockUserId} not found`));

      await expect(controller.findById(mockUserId)).rejects.toThrow(
        new NotFoundException(`Category with id ${mockUserId} not found`),
      );
    });
  })
});
