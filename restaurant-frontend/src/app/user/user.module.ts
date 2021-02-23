import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { PrecheckProfileDialogComponent } from './components/precheck-profile-dialog/precheck-profile-dialog.component';



@NgModule({
  declarations: [ProfileComponent, PrecheckProfileDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    AuthModule,
  ]
})
export class UserModule { }
