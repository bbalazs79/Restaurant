import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddToCartDto } from 'dtos/order/order-food.dto';
import { UpdateCartCountDto, UpdateCartStateDto } from 'dtos/order/update-cart.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/schemas/user.schema';
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

    // @Put('/:id')
    // public update(@Param('id') id: string, @Body() dto: UpdateCartDto, @CurrentUser() user: User): Promise<any> {
    //     return this.cartService.update(id, dto, user);
    // }

    @UseGuards(AuthGuard)
    @Put('/updateCount/:id')
    public async updateCount(@Param('id') id: string, @Body() updateCartCountDto: UpdateCartCountDto): Promise<Cart[]>{
        return await this.cartService.updateCount(id,updateCartCountDto.count);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Put('/updateOrderState/:id')
    public async updateState(@Param('id') id: string, @Body() updateCartStateDto: UpdateCartStateDto): Promise<Cart[]>{
        return await this.cartService.
        updateOrderState(id,updateCartStateDto.state);
    }

    @UseGuards(AuthGuard)
    @Get('/deleteCartComponent/:id')
    public async deleteCartComponent(@Param('id') id: string): Promise<boolean>{
        return !!await this.cartService.deleteCartComponent(id);
    }

    @Get('/placeOrder')
    @UseGuards(AuthGuard)
    public /* async  */placeOrder(@CurrentUser() user: User)/* : Promise<any> */{
        return /* await */ /* this.cartService.updateOrderStateWhereStateIsCart(user._id); */ user._id;
    }
}
