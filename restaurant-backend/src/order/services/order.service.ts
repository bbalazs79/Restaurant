import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '../schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from './cart.service';
import { CreateOrderDto, ParamOrderDto } from 'dtos/order/order-food.dto';
import { Cart, CartDocument } from '../schemas/cart.schema';
import moment from 'moment';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private cartService: CartService,
    ) {}

  public async add(orderParams: ParamOrderDto): Promise<any> {
    await this.cartModel.find({user: orderParams.userId}).exec().then(x=>{
      let newOrder: CreateOrderDto;
      newOrder.order = x;
      newOrder.deliveryAddress = orderParams.deliveryAddress;
      newOrder.deliveryTime = new Date(moment().fromNow());
      const response = new this.orderModel(newOrder);

      return !!response.save();
    });
    return false;
  }

  public async findAll(): Promise<any> {
    return await this.orderModel.find().exec();
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
