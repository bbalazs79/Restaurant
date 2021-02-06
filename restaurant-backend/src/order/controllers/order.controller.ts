import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParamOrderDto } from 'dtos/order/order-food.dto';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  public async add(@Body() order: ParamOrderDto): Promise<any> {
    //console.log("userId: "+order.userId+" ,adress: "+order.deliveryAddress);
    const result = await this.orderService.add(order);
    return result;
  }


}
