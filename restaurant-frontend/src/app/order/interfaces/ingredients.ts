import { Allergens } from "../enums/allergens.enum";

export interface Ingredients {
  name: string;
  allergene: Allergens[];
}
