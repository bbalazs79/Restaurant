import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Food } from '../../interfaces/food';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  public product: Food;
  productCount: number = 1;
  constructor(
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) product: Food,
    ) {
      this.product = product;
    }

  ngOnInit(): void {
    /* console.log(this.product); */
  }

  async addToCart(){
    /* console.log("id: "+this.product._id + " product name: " + this.product.name + " count: "+ this.productCount); */
    this.cartService.addToCart({food: this.product._id, count: this.productCount})
    .pipe(
      tap(() => {
        this.dialogRef.close(true);
      }),
      catchError(() => {
        this.dialogRef.close(false);
        return EMPTY;
      })
    )
    .subscribe();
  }
}
