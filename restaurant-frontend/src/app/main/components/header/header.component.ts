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

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {}

  onClickLogout() {
    this.authService.logout().subscribe();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}