import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '../schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto, ParamOrderDto } from 'dtos/order/order-food.dto';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { OrderState } from '../enums/orderstate.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    ) {}

  public async add(orderParams: ParamOrderDto): Promise<any> {
    const cart = await this.cartModel.find({
      user: orderParams.userId,
      state: OrderState.CART,
    });

    if (cart?.length <= 0) {
      throw new BadRequestException('Nincs elem a kosárban!');
    }

    const newOrder: CreateOrderDto = {
      Order: cart,
      deliveryAddress: orderParams.deliveryAddress,
      deliveryTime: new Date(),
    };

    await this.cartModel.updateMany({ user: orderParams.userId }, {
      state: OrderState.ORDERED,
    });

    const response = new this.orderModel(newOrder);

    return !!response.save();
  }

  public findAll(): Promise<any> {
    return this.orderModel.find().exec();
  }

  public async findById(id?: string): Promise<any> {
    const result = await this.orderModel.findOne({ _id: id });
    return result;

    /* return {
            rolename: result.role, 
            roleId: result._id
        }; */
  }
}
