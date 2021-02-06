import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, Min } from "class-validator";
import { OrderState } from "src/order/enums/orderstate.enum";

export class UpdateCartDto {

    @IsNotEmpty()
    @ApiProperty()
    food?: string;
    
    @Min(0)
    @ApiProperty()
    count?: number;
    
    @IsEnum(OrderState)
    @ApiProperty()
    state?: OrderState;
}

export interface UpdateCartCountDto {
    count: number;
}

export interface UpdateCartStateDto {
    state: OrderState;
}