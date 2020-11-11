import { Ingredients } from "./ingredients";

export interface Food {
  imgSource: string;
  name: string;
  price: number;
  ingredients: Ingredients[];
}
