import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientService } from './services/ingredient.service';
import { IngredientController } from './controllers/ingredient.controller';
import { Product, ProductSchema } from './shemas/product.schema';
import { Ingredient, IngredientSchema } from './shemas/ingredient.schema';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  providers: [ProductService, IngredientService],
  controllers: [ProductController, IngredientController],
  exports: [ProductService, IngredientService]
})
export class ProductModule {}
