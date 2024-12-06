import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { UploadFileDto } from '../file-upload/dto/uploadFileDto';


const mockUserId = uuidv4();

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: ProductsRepository;

  const mockProductsRepository = {
    create: jest.fn(),
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    uploadFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        {provide: ProductsRepository, useValue: mockProductsRepository},
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        stock: 100,
        categoryId: '1',
        imgUrl: 'https://example.com/product1.jpg',
      };
      const mockCreatedProduct = { id: mockUserId, ...createProductDto };

      mockProductsRepository.create.mockResolvedValue(mockCreatedProduct);

      const result = await service.create(createProductDto);

      expect(result).toEqual(mockCreatedProduct);
      expect(mockProductsRepository.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const mockProducts = [{ id: mockUserId, name: 'Product 1' }];
      mockProductsRepository.getAllProducts.mockResolvedValue({
        data: mockProducts,
        page: 1,
        limit: 5,
        totalCount: 1,
        totalPages: 1,
      });

      const result = await service.findAll({ page: 1, limit: 5 });

      expect(result).toEqual({
        data: mockProducts,
        page: 1,
        limit: 5,
        totalCount: 1,
        totalPages: 1,
      });
      expect(mockProductsRepository.getAllProducts).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('uploadFile', () => {
    it('should upload a file and return the image URL', async () => {
      const mockFile: UploadFileDto = {
        fieldname: 'file',
        originalname: 'file.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('test'),
      };
      const mockUrl = 'https://example.com/file.jpg';

      mockProductsRepository.uploadFile.mockResolvedValue({ imgUrl: mockUrl });

      const result = await service.uploadFile(mockFile, '1');

      expect(result).toEqual({ imgUrl: mockUrl });
      expect(mockProductsRepository.uploadFile).toHaveBeenCalledWith(mockFile, '1');
    });
  });
});
