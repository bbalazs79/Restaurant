import { BadRequestException, Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddToCartDto } from 'dtos/order/order-food.dto';
import { UpdateCartCountDto, UpdateCartStateDto } from 'dtos/order/update-cart.dto';
import { Schema } from 'mongoose';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrderState } from '../enums/orderstate.enum';
import { Cart } from '../schemas/cart.schema';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @UseGuards(AuthGuard)
    @Post()
    public async addOrder(@Body() cart: AddToCartDto, @CurrentUser() user): Promise<boolean> {
        cart.user = user._id;
        cart.state = OrderState.CART;
        
        if(cart.count < 1){
            throw new BadRequestException();
        }

        const result = await this.cartService.create(cart);
        return !!result; 
    }

    @UseGuards(AuthGuard)
    @Get()
    public async findAll(): Promise<Cart[]> {
        return await this.cartService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    public async findAllByUser(@Param('id') id: string/* Schema.Types.ObjectId */): Promise<Cart[]>{
        return await this.cartService.findAllByUser(id);
    }

    // @Put('/:id')
    // public update(@Param('id') id: string, @Body() dto: UpdateCartDto, @CurrentUser() user: User): Promise<any> {
    //     return this.cartService.update(id, dto, user);
    // }

    @Put('/updateCount/:id')
    public async updateCount(@Param('id') id: string, @Body() updateCartCountDto: UpdateCartCountDto): Promise<Cart[]>{
        return await this.cartService.updateCount(id,updateCartCountDto.count);
    }

    @Put('/updateOrderState/:id')
    public async updateState(@Param('id') id: string/* Schema.Types.ObjectId */, @Body() updateCartStateDto: UpdateCartStateDto): Promise<Cart[]>{
        return await this.cartService.
        updateOrderState(id,updateCartStateDto.state);
    }
}
