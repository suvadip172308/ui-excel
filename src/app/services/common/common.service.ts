import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action= 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
