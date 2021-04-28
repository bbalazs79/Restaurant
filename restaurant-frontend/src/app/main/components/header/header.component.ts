import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public currUserName$: BehaviorSubject<string>;
  public userPremission$: BehaviorSubject<string>;

  constructor(public authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currUserName$ = this.authService.currUserName$;
  }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.authService.logout().subscribe();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    localStorage.setItem('token','');
    //window.location.reload();
  }
}
