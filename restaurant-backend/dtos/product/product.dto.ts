import { IngredientDto } from './ingredient.dto';

export interface ProductDto {
  imgSource: string;
  name: string;
  price: number;
  ingredients: IngredientDto[];
}
