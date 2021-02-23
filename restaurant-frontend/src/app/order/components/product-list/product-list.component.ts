import { Component, OnInit } from '@angular/core';
import { Food } from "../../interfaces/food";
import { FoodService } from "../../services/food.service";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  food: Food[];
  public isLoggedIn$: BehaviorSubject<boolean>;
  
  constructor(
    private foodService: FoodService, 
    private authService: AuthService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    ) {
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

  openConfirmDialog(food: any) {
    /* console.log(foodId); */
    this.matDialog.open(OrderDialogComponent, {
      data: food,
    })
      .afterClosed()
      .subscribe((result) => {
        // A result-ban van az az érték, amit a Dialog-ban a close()-nak átadunk
        if (result) {
          this.matSnackBar.open('Kosárhoz adva', null,{
            panelClass: 'success',
            duration: 4000,
          });
        } else if (result === false) {
          // ha valami hiba van (false)
          this.matSnackBar.open('Hiba van', null, {
            panelClass: 'warn',
            duration: 4000, // ms
          });
        } else {
          // itt null, akkor a cancel-re kattintott
        }
      });
  }
}
