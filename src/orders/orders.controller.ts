import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(@Body() createOrderDto: CreateOrderDto){
    const order =  await this.ordersService.addOrder(createOrderDto);

    return {
      userId: order.user.id,
      products: order.orderDetail.products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
      }))
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id: string){
    return await this.ordersService.getOrder(id);
  }
}
