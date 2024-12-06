import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { OrderDetail } from './entities/order.detail.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) { }

  async getOrder(id: string){
    const order = await this.orderRepository.findOne({
      where: {id},
      relations: ['user', 'orderDetail', 'orderDetail.products']
    });

    if(!order){
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const orderWithUserId = {
      ...order,
      user: {id: order.user.id}
    };
    return orderWithUserId;
  }

  async addOrder(createOrderDto: CreateOrderDto){
    const {userId, products: productIds} = createOrderDto;
    
    const user = await this.userRepository.findOne({
      where: {id: userId}
    });
    if(!user){
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const productsFound = await this.productRepository.find({
      where: {id: In(productIds)}
    })

    if (productsFound.length !== productIds.length) {
      throw new NotFoundException('Some products were not found');
    }

    const availableProducts = productsFound.filter((product) => product.stock > 0);

    if (availableProducts.length === 0) {
      throw new NotFoundException('No products available for order');
    }

    let totalPrice = 0;

    availableProducts.forEach((product) => {
      totalPrice += parseFloat(product.price.toString());
      product.stock -= 1;
    });

    totalPrice = parseFloat(totalPrice.toFixed(2));

    await this.productRepository.save(availableProducts);

    const orderDetail = this.orderDetailRepository.create({
      price: totalPrice,
      products: availableProducts
    });

    await this.orderDetailRepository.save(orderDetail);

    const newOrder = this.orderRepository.create({
      user,
      orderDetail,
      products: availableProducts
    });

    await this.orderRepository.save(newOrder);
    return newOrder;
  }
}
