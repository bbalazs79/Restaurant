import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '../schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {}

  public async add(order: Order): Promise<boolean> {
    const newOrder = new this.orderModel( order );
    return !!newOrder.save();
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
