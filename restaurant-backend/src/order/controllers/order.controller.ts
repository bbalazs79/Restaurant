import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParamOrderDto } from 'dtos/order/order-food.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async add(@Body() order: ParamOrderDto): Promise<any> {
    const result = await this.orderService.add(order);
    return result;
  }
}
