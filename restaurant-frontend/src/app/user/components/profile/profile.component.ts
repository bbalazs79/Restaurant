import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: any;

  constructor(private _formBuilder: FormBuilder, private profileService: ProfileService,) { }

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

  async changeProfile(){
    await this.profileService.updateUserProfile(this.userProfile._id, {
      _id:this.userProfile._id,
      ...this.profileForm.value,
      role: this.userProfile.role
    });
  }
}
