import { Ingredients } from "./ingredients";

export interface Food {
  src: string;
  name: string;
  price: number;
  ingredients: Ingredients[];
}
