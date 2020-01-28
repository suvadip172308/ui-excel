import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { ApiService } from '../api/api.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private apiService: ApiService
  ) { }

  openSnackBar(message: string, action = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  openConfirmDialog(message: string) {
    return this._dialog.open(ConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '100px' },
      data: {
        message
      }
    })
  }

  getDate(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${day}/${month}/${year}`;
  }

  getSerialNo(pageInfo, index) {
    return (pageInfo.offset * pageInfo.pageSize) + index + 1;
  }

  isObjectEmpty(object) {
    return _.isEmpty(object);
  }
}
