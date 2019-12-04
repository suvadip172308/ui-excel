import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  openSnackBar(message: string, action= 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getDate(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    return `${day}/${month}/${year}`;
  }

  getSerialNo(pageInfo, index) {
    return (pageInfo.offset * pageInfo.pageSize) + index + 1;
  }
}
