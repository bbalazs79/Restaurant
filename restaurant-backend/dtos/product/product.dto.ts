import { Ingredient } from 'src/product/schemas/ingredient.schema';

export interface ProductDto extends Document {
  name: string;
  price: number;
  ingredients: Ingredient[];
}
