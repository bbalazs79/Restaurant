import { OrderState } from "src/order/enums/orderstate.enum";

export interface AddToCartDto{
    food: string;
    count: number;
    user: string;
    state?: OrderState;
}

/* export interface CartDto {
    preOrdered: FoodCountDto[];
    state: OrderState
} */

export interface OrderDto{
    order: AddToCartDto[];
    deliveryAddress: string;
    deliveryTime: Date;
}