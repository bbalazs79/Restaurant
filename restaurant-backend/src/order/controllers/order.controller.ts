import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ParamOrderDto } from 'dtos/order/order-food.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  public async getAll(): Promise<any> {
    const result = await this.orderService.findAll();
    return result;
  }

  @Put('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  public async readyOrder(@Param('id') id: string): Promise<any> {
    const result = await this.orderService.orderReady(id);
    return result;
  }


  @Put('deleteOrder/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  public async deleteOrder(@Param('id') id: string): Promise<any> {
    const result = await this.orderService.deleteOrder(id);
    return result;
  }
}
