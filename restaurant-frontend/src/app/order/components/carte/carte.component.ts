import { Component, OnInit } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { ProfileService } from "src/app/user/services/profile.service";
import { CarteService } from "../../services/carte.service";

@Component({
  selector: "app-carte",
  templateUrl: "./carte.component.html",
  styleUrls: ["./carte.component.scss"]
})
export class CarteComponent implements OnInit {
  public userCarte: any;
  public countPrice: number = 30000;
  constructor(private carteService: CarteService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.UserCarte();
  }

  UserCarte(){
    /* this.profileService.getUserId().pipe(
      switchMap((response) => 
        this.carteService.getUserCarte(response).pipe(tap(x=>{
          this.userCarte = x;
        }));
    )); */

    /* this.profileService.getUserId().pipe(
      switchMap(response => 
        this.carteService.getUserCarte(response)
        .pipe(
          tap(x=> this.userCarte = x)
      ))
    ).subscribe(); */

    this.profileService.getUserId().pipe(
      switchMap((response) => this.carteService.getUserCarte(response)),
      tap((response) => {
        this.userCarte = response;
      }),
      map(()=>console.log(this.userCarte))
      ).subscribe();
  }
}
