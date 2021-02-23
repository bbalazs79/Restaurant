import { Component, OnInit } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { ProfileService } from "src/app/user/services/profile.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  public userCart: any;
  public countPrice: number = 30000;
  constructor(private cartService: CartService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.UserCart();
  }

  UserCart(){
    /* this.profileService.getUserId().pipe(
      switchMap((response) => 
        this.cartService.getUserCart(response).pipe(tap(x=>{
          this.userCart = x;
        }));
    )); */

    /* this.profileService.getUserId().pipe(
      switchMap(response => 
        this.cartService.getUserCart(response)
        .pipe(
          tap(x=> this.userCart = x)
      ))
    ).subscribe(); */

    this.profileService.getUserId().pipe(
      switchMap((response) => this.cartService.getUserCart(response)),
      tap((response) => {
        this.userCart = response;
      }),
      map(()=>console.log(this.userCart))
      ).subscribe();
  }
}
