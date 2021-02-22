import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Order, OrderSchema } from './schemas/order.schema';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, { name: Cart.name, schema: CartSchema }]),
  ],
  providers: [OrderService, CartService],
  controllers: [OrderController, CartController],
  exports: [],
})
export class OrderModule {}
