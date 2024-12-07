import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @ApiOperation({
    summary: 'Crear una nueva orden',
    description: 'Este endpoint permite crear una nueva orden. Los datos de la orden se proporcionan en el DTO de creación.'
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos proporcionados.',
  })
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


  @ApiOperation({
    summary: 'Obtener una orden por ID',
    description: 'Este endpoint permite obtener los detalles de una orden utilizando su ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Orden obtenida correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada.',
  })
  @Get(':id')
  async getOrder(@Param('id') id: string){
    return await this.ordersService.getOrder(id);
  }
}
