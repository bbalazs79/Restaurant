import { Allergens } from 'src/product/enums/allergene.enum';

export interface IngredientDto {
  name: string;
  allergen: Allergens[];
}
