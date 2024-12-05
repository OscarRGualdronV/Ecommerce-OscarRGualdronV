import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';


describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  const mockCategoryRepository = {
    findOneBy: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
        {provide: getRepositoryToken(Category), useValue: mockCategoryRepository},
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategoryById', () => {
    it('should return a category if found', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const category = { id: uuid, name: 'test Category'} as Category;
      mockCategoryRepository.findOneBy.mockResolvedValue(category);

      const result = await service.getCategoryById(uuid);
      expect(result).toEqual(category);
      expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({ id: uuid });
    })

    it('should throw NotFoundException if category not found', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockCategoryRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getCategoryById(uuid)).rejects.toThrow(
        new NotFoundException(`Category with id ${uuid} not found`),
      );
    });
  })
});
