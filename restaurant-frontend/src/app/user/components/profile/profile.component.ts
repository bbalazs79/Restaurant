import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { PrecheckProfileDialogComponent } from '../precheck-profile-dialog/precheck-profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: any;

  constructor(
    private _formBuilder: FormBuilder,
    private profileService: ProfileService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile().pipe(
      tap(response => {
        this.userProfile = response;
        this.profileForm = this._formBuilder.group({
          username: [this.userProfile.username, Validators.required],
          first_name: [this.userProfile.first_name, Validators.required],
          last_name: [this.userProfile.last_name, Validators.required],
          email: [this.userProfile.email, Validators.required],
          phone_number: [this.userProfile.phone_number, Validators.required],
          zip_code: [this.userProfile.zip_code, Validators.required],
          city: [this.userProfile.city, Validators.required],
          street: [this.userProfile.street, Validators.required],
          house_number: [this.userProfile.house_number, Validators.required],
          storey: [this.userProfile.storey],
          door_number: [this.userProfile.door_number],
          doorbell: [this.userProfile.doorbell]
        });
      })
    ).subscribe();
  }

  openConfirmDialog() {
    this.matDialog.open(PrecheckProfileDialogComponent, {
      data: this.userProfile._id,
    })
      .afterClosed()
      .subscribe((result) => {
        // A result-ban van az az érték, amit a Dialog-ban a close()-nak átadtál
        if (result) {
          this.changeProfile();
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

  async changeProfile(){
    // Observable-t nem lehet awaitelni, mert nem promise
    this.profileService.updateUserProfile(this.userProfile._id, {
      _id:this.userProfile._id,
      ...this.profileForm.value,
      role: this.userProfile.role
    }).subscribe(() => {
      this.matSnackBar.open('Sikeres módosítás!', null, {
        panelClass: 'success',
        duration: 4000, // ms
      });
    });
  }
}
