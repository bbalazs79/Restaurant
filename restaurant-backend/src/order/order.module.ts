import { Module } from '@nestjs/common';
import { OrderController } from './controlleres/order.controller';
import { OrderService } from './services/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Order, OrderSchema } from './schemas/order.schema';
import {
  FoodNumber,
  FoodNumberSchema,
} from './schemas/food-order-count.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: FoodNumber.name, schema: FoodNumberSchema },
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
