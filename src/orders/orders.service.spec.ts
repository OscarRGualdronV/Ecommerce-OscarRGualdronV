import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { OrderDetail } from './entities/order.detail.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


const mockUserId = uuidv4();
const mockUserId2 = uuidv4();
const mockProductId1 = uuidv4();
const mockProductId2 = uuidv4();


describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: Repository<Order>;
  let userRepository: Repository<User>;
  let producRepository: Repository<Product>;
  let orderDetailRepository: Repository<OrderDetail>;

  const mockOrderRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  }

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockProductRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };

  const mockOrderDetailRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService,
        {provide: getRepositoryToken(Order), useValue: mockOrderRepository},
        {provide: getRepositoryToken(User), useValue: mockUserRepository},
        {provide: getRepositoryToken(Product), useValue: mockProductRepository},
        {provide: getRepositoryToken(OrderDetail), useValue: mockOrderDetailRepository},
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    producRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    orderDetailRepository = module.get<Repository<OrderDetail>>(getRepositoryToken(OrderDetail));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getOrder', () => {
    it('should return the order with user id', async () => {
      const mockOrder = {
        user: { id: mockUserId },
        orderDetail: [],
      };

      mockOrderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await service.getOrder(mockUserId);

      expect(result).toEqual({
        ...mockOrder,
        user: { id: mockOrder.user.id },
      });
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUserId },
        relations: ['user', 'orderDetail', 'orderDetail.products'],
      });
    });

    it('should throw NotFoundException if order not found', async () => {
      mockOrderRepository.findOne.mockResolvedValue(null);

      await expect(service.getOrder('1')).rejects.toThrow(
        new NotFoundException('Order with ID 1 not found'),
      );
    });

    describe('addOrder', () => {
      it('should create and return a new order', async () => {
        const createOrderDto = {
          userId: mockUserId,
          products: ['mockProductId1', 'mockProductId2'],
        };
  
        const mockUser = { id: mockUserId };
        const mockProducts = [
          { id: mockProductId1, stock: 5, price: 100 },
          { id: mockProductId2, stock: 3, price: 150 },
        ];
  
        mockUserRepository.findOne.mockResolvedValue(mockUser);
        mockProductRepository.find.mockResolvedValue(mockProducts);
        mockProductRepository.save.mockResolvedValue(mockProducts);
        mockOrderDetailRepository.create.mockReturnValue({
          price: 250,
          products: mockProducts,
        });
        mockOrderDetailRepository.save.mockResolvedValue({});
        mockOrderRepository.create.mockReturnValue({});
        mockOrderRepository.save.mockResolvedValue({});
  
        const result = await service.addOrder(createOrderDto);
  
        expect(result).toEqual({});
        expect(mockOrderRepository.save).toHaveBeenCalledWith(expect.any(Object));
        expect(mockOrderDetailRepository.save).toHaveBeenCalledWith(expect.any(Object));
        expect(mockProductRepository.save).toHaveBeenCalledWith(mockProducts);
      });
    
      it('should throw NotFoundException if no products are available', async () => {
        const createOrderDto = { userId: mockUserId, products: ['mockProductId'] };
  
        const mockUser = { id: mockUserId };
        mockUserRepository.findOne.mockResolvedValue(mockUser);
        mockProductRepository.find.mockResolvedValue([
          { id: 'mockProductId', stock: 0, price: 100 },
        ]);
  
        await expect(service.addOrder(createOrderDto)).rejects.toThrow(
          new NotFoundException('No products available for order'),
        );
      });
    });
  });
});
