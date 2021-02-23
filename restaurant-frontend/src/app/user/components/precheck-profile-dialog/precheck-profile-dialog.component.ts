import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BasicCheckDto } from '../../interfaces/checkPass.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-precheck-profile-dialog',
  templateUrl: './precheck-profile-dialog.component.html',
  styleUrls: ['./precheck-profile-dialog.component.scss']
})
export class PrecheckProfileDialogComponent {
  checkData: BasicCheckDto;
  constructor(
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<PrecheckProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) profileId: string,
    ) { 
      this.checkData = {
        _id: profileId,
        password: null,
      };
    }

  chackPassword(){
    this.profileService.checkPass(this.checkData)
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
