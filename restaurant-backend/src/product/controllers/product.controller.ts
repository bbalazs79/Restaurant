// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Controller,
  Post,
  UseGuards,
  Body,
  ConflictException,
  Param,
  Get,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
/* import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard'; */
import { Product } from '../schemas/product.schema';
import { ProductDto } from 'dtos/product/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  /* @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin') */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async add(@Body() productDto: ProductDto): Promise<void> {
    const result = await this.productService.add(productDto);

    if (!result) {
      throw new ConflictException();
    }
  }

  @Get()
  /* @UseGuards(AuthGuard) */
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  /* @UseGuards(AuthGuard) */
  async findById(@Param('id') id: string): Promise<Product> {
    return await this.productService.findById(id);
  }
}
