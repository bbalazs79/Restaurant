import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddToCartDto } from 'dtos/order/order-food.dto';
import { UpdateCartCountDto, UpdateCartStateDto } from 'dtos/order/update-cart.dto';
import { Cart } from '../schemas/cart.schema';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @Post()
    public async addOrder(@Body() cart: AddToCartDto): Promise<boolean> {
        const result = await this.cartService.create(cart);
        return !!result;
    }

    @Get()
    public async findAll(): Promise<Cart[]> {
        return await this.cartService.findAll();
    }

    @Get('/:id')
    public async findAllByUser(@Param('id') id: string): Promise<Cart[]>{
        return await this.cartService.findAllByUser(id);
    }

    @Put('/updateCount/:id')
    public async updateCount(@Param('id') id: string, @Body() updateCartCountDto: UpdateCartCountDto): Promise<Cart[]>{
        return await this.cartService.updateCount(id,updateCartCountDto.count);
    }

    @Put('/updateOrderState/:id')
    public async updateState(@Param('id') id: string, @Body() updateCartStateDto: UpdateCartStateDto): Promise<Cart[]>{
        return await this.cartService.
        updateOrderState(id,updateCartStateDto.state);
    }
}
