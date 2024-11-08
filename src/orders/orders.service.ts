import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
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

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, products } = createOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const productsIds = products.map((product) => product.id);
    const productEntities = await this.productRepository.find({
      where: { id:  In(productsIds)},
    });
    if (productsIds.length !== productEntities.length) {
      throw new Error('One or more products not found');
    }

    const orderDetail = await this.createOrderDetail(productEntities);

    const order = new Order();
    order.user = user;
    order.products = productEntities;
    order.orderDetail = new OrderDetail();

    return await this.orderRepository.save(order);
    
  }

  async createOrderDetail(products: Product[]): Promise<OrderDetail> {
    const orderDetail = new OrderDetail();
    let total = 0;
    products.forEach(product => {
      const price = parseFloat(product.price.toString());
      console.log(`Precio antes de la conversión: ${product.price}`);
      console.log(`Precio después de la conversión: ${price}`);

      if(isNaN(product.price)) {
        throw new Error(`Precio no válido para el producto con id ${product.id}`);
      } 
      total += price; 
    });
    console.log(`Precio total acumulado: ${total}`);
    orderDetail.price= parseFloat(total.toFixed(2));
  
    return await this.orderDetailRepository.save(orderDetail);
  }


  // findAll() {
  //   return `This action returns all orders`;
  // }

  async findOne(id: string) {
    return await this.orderRepository.findOne({ 
      where: { id },
      relations: ['user', 'products', 'orderDetail'],});
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
