import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Order } from '../schemas/order.schema';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  /* @Post()
  public async add(@Body() foodNumber: FoodNumber, order: Order): Promise<boolean> {
    const count = await this.orderService.addFoodCount(foodNumber).then(x=>{
      const foodNumberResult = this.orderService.findById()
      const result = this.orderService.add(order);
      return !!result;
    }); 

    const result = await this.orderService.add(order);
    return !!count;
  }*/

  /* @Post('/foodCount')
  public async addFoodnumber(@Body() foodNumber: FoodNumber): Promise<boolean> {
    const result = await this.orderService.addFoodCount(foodNumber);
    return !!result;
  } */

  @Post()
  public async addOrder(@Body() order: Order): Promise<boolean> {
    const result = await this.orderService.add(order);
    return !!result;
  }
}
