import { Schema, Types } from "mongoose";
import { OrderState } from "src/order/enums/orderstate.enum";

export interface AddToCartDto{
    /* food: Schema.Types.ObjectId; */
    food: string;
    count: number;
    /* user: Schema.Types.ObjectId; */
    user: string;
    state?: OrderState;
}

/* export interface CartDto {
    preOrdered: FoodCountDto[];
    state: OrderState
} */

export interface CreateOrderDto{
    Order: AddToCartDto[];
    deliveryAddress: string;
    deliveryTime: Date;
}

export interface ParamOrderDto{
    /* userId: Schema.Types.ObjectId; */
    userId: string;
    deliveryAddress: string;
    // products: {
    //     productId: string;
    //     quantity: number;
    // }[];
}