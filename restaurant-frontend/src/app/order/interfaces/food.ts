import { Ingredients } from "./ingredients";

export interface Food {
  _id: string;
  imgSource: string;
  name: string;
  price: number;
  ingredients: Ingredients[];
}
