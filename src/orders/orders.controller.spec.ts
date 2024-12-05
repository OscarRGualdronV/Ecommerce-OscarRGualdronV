import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


const mockUserId = uuidv4();
const mockProductId = uuidv4();

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrdersService = {
    addOrder: jest.fn(),
    getOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{
        provide: OrdersService,
        useValue: mockOrdersService}],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addOrder', () => {
    it('should return a successfully created order with the correct structure', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: mockUserId,
        products: [{id: mockProductId}],
      };

      const mockOrder = {
        user: { id: mockUserId },
        orderDetail: { products: [{ id: mockProductId, name: 'Product 1', description: 'Description 1', price: 100, stock: 10 }] },
      };

      mockOrdersService.addOrder.mockResolvedValue(mockOrder);

      const result = await controller.addOrder(createOrderDto);

      expect(result).toEqual({
        userId: mockUserId,
        products: [
          { id: mockProductId, name: 'Product 1', description: 'Description 1', price: 100, stock: 10 }
        ],
      });
      expect(mockOrdersService.addOrder).toHaveBeenCalledWith(createOrderDto);
    });

    it('should throw an error if order creation fails', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: mockUserId,
        products: [{ id: mockProductId }],
      };

      mockOrdersService.addOrder.mockRejectedValue(new NotFoundException('Error creating order'));

      await expect(controller.addOrder(createOrderDto)).rejects.toThrow(
        new NotFoundException('Error creating order'),
      );
    });
  });
});
