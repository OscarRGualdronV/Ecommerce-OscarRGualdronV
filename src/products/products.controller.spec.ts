import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';


const mockProductId1 = uuidv4();
const mockProductId2 = uuidv4();

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    uploadFile: jest.fn(),
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
      controllers: [ProductsController],
      providers: [
        {provide: ProductsService,useValue: mockProductsService},
        {provide: JwtGuard, useValue: {mockJwtGuard}},
        {provide: JwtService, useValue: mockJwtService},
        {provide: ConfigService, useValue: mockConfigService},
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        stock: 100,
        categoryId: '1',
        imgUrl: 'image.png',
      };
      const mockCreatedProduct = { id: mockProductId1, ...createProductDto };

      mockProductsService.create.mockResolvedValue(mockCreatedProduct);

      const result = await controller.create(createProductDto);

      expect(result).toEqual(mockCreatedProduct);
      expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const mockProductList = [
        { id: mockProductId1, name: 'Product A', price: 100, categoryId: 'some-category-id' },
        { id: mockProductId2, name: 'Product B', price: 150, categoryId: 'some-category-id' },
      ];
  
      mockProductsService.findAll.mockResolvedValue(mockProductList);
      const result = await controller.findAll(1, 5);
  
      expect(result).toEqual(mockProductList);
      expect(mockProductsService.findAll).toHaveBeenCalledWith({ page: 1, limit: 5 });
      expect(mockProductsService.findAll).toHaveBeenCalledTimes(1);
    });
  });
  
  
});
