import { Component, OnInit } from "@angular/core";
import { Allergens } from "../../enums/allergens.enum";
import { Food } from "../../interfaces/food";
import { Ingredients } from "../../interfaces/ingredients";

@Component({
  selector: "app-carte",
  templateUrl: "./carte.component.html",
  styleUrls: ["./carte.component.scss"]
})
export class CarteComponent implements OnInit {
  ingredient: Ingredients = {
    name: "Szósz",
    allergene: [Allergens.LACTOSE, Allergens.LACTOSE]
  };
  ingredient0: Ingredients = {
    name: "Alma",
    allergene: [Allergens.LACTOSE, Allergens.LACTOSE]
  };
  ingredient1: Ingredients = {
    name: "Sajt",
    allergene: [Allergens.LACTOSE, Allergens.LACTOSE]
  };

  foods: Food[] = [
    {
      src: "item-1.jpg",
      name: "Pizza",
      price: 1000,
      ingredients: [this.ingredient, this.ingredient0, this.ingredient1]
    },
    {
      src: "item-1.jpg",
      name: "Palacsinta",
      price: 1200,
      ingredients: [this.ingredient]
    },
    {
      src: "item-1.jpg",
      name: "Túrós rétes",
      price: 390,
      ingredients: [this.ingredient]
    },
    {
      src: "item-1.jpg",
      name: "Kefír",
      price: 99,
      ingredients: [this.ingredient]
    },
    {
      src: "item-1.jpg",
      name: "Sztrapacska",
      price: 2300,
      ingredients: [this.ingredient]
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
