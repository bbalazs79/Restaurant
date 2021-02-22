import { Component, OnInit } from '@angular/core';
import { Food } from "../../interfaces/food";
import { FoodService } from "../../services/food.service";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  food: Food[];
  public isLoggedIn$: BehaviorSubject<boolean>;
  /* ingredient: Ingredients = {
    name: 'Szósz',
    allergene: [Allergens.LACTOSE, Allergens.LACTOSE]
  };
  ingredient0: Ingredients = {
    name: 'Alma',
    allergene: [Allergens.LACTOSE, Allergens.LACTOSE]
  };
  ingredient1: Ingredients = {
    name: 'Sajt',
    allergene: [Allergens.LACTOSE, Allergens.LACTOSE]
  }; 

  foods: Food[] = [
    {
      imgSource: 'assets/item-1.jpg',
      name: 'Pizza',
      price: 1000,
      ingredients: [this.ingredient, this.ingredient0, this.ingredient1]
    },
    {
      imgSource: 'assets/item-1.jpg',
      name: 'Palacsinta',
      price: 1200,
      ingredients: [this.ingredient]
    },
    {
      imgSource: 'assets/item-1.jpg',
      name: 'Túrós rétes',
      price: 390,
      ingredients: [this.ingredient]
    },
    {
      imgSource: 'assets/item-1.jpg',
      name: 'Kefír',
      price: 99,
      ingredients: [this.ingredient]
    },
    {
      imgSource: 'assets/item-1.jpg',
      name: 'Sztrapacska',
      price: 2300,
      ingredients: [this.ingredient]
    }
  ]; */
  constructor(private foodService: FoodService, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.food = [];
    this.getFoods();
  }

  getFoods() {
    this.foodService
      .getFood()
      .pipe(
        tap(x => {
          this.food = x;
        }),
        map(x => {
          /* console.log(x); */
        })
      )
      .subscribe();
  }

}
