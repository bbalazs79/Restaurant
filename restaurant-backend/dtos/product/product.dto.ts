import { IngredientDto } from './ingredient.dto';

export interface ProductDto {
  name: string;
  price: number;
  ingredients: IngredientDto[];
}
