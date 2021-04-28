import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { User } from "src/app/user/interfaces/user.interface";
import { ProfileService } from "src/app/user/services/profile.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  public userCart: any;
  public countPrice: number = 0;
  public deliveryForm: FormGroup;
  public address: string;
  public currentUser$: BehaviorSubject<User>;

  constructor(
    private cartService: CartService, 
    private profileService: ProfileService,
    private authService: AuthService,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    ) {
      this.currentUser$ = this.authService.currentUser$;
      this.deliveryForm = this.fb.group({
        deliveryAddress: ["", [Validators.required]],
      });
      
    }

  ngOnInit(): void {
    this.UserCart();
  }

  UserCart(){
    this.profileService.getUserId().pipe(
      switchMap((response) => this.cartService.getUserCart(response)),
      tap((response) => {
        console.log(response);
        this.userCart = response;
        response.forEach(element => {
          this.countPrice += element.count * element.food.price;
        });
      }),
      /* map(()=> console.log(this.userCart)) */
      ).subscribe();
  }

  deleteCartComponent(id: string){
    console.log(id);
    this.cartService.reoveFromCart(id).subscribe(()=>window.location.reload());
  }

  placeOrder(){
    this.profileService.getUserId().pipe(
      switchMap(
        (response)=>this.cartService.placeOrder({userId: response, deliveryAddress: this.address})
        .pipe(
          tap(response => {
            if(response){
              this.matSnackBar.open('Köszönjük a rendelést!', null,{
                panelClass: 'success',
                duration: 4000,
              });
            }else{
              this.matSnackBar.open('Hiba történt.', null, {
                panelClass: 'warn',
                duration: 4000, // ms
              });
            }
            window.location.reload();
          }))
        )
    ).subscribe();
  }
}
