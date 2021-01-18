import { OrderState } from "src/order/enums/orderstate.enum";

export interface UpdateCartCountDto{
    count: number;
}

export interface UpdateCartStateDto{
    state: OrderState;
}