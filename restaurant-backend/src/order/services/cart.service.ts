import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AddToCartDto } from 'dtos/order/order-food.dto';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { OrderState } from '../enums/orderstate.enum';
import { Cart, CartDocument } from '../schemas/cart.schema';

@Injectable()
export class CartService {
    constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    ) {}

    public async create(cart: AddToCartDto): Promise<boolean> {
        const response = new this.cartModel(cart);
        return !!response.save();
    }

    findAll(): Promise<Cart[]> {
        return this.cartModel.find().exec();
    }

    findAllByUser(userid: string): Promise<Cart[]>{
        return this.cartModel.find({user: userid}).exec();
    }

    // async update(id: string, model: Partial<Cart>, user: User): Promise<any> {
    //     const original = await this.cartModel.findById(id);

    //     return this.cartModel.updateOne(
    //         { _id: id },
    //         model,
    //     ).exec();
    // }

    async updateCount(cartId: string, count: number): Promise<any>{
        return this.cartModel.updateOne({_id: cartId},{count: count}).exec();
    }

    async updateOrderState(userId: string, orderstate: OrderState): Promise<any>{
        return this.cartModel.updateMany({user: userId},{state: orderstate}).exec();
    }
}
