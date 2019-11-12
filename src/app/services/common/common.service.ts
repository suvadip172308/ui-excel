import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, pipe } from "rxjs";
import { delay, map } from 'rxjs/operators';

import { companyData } from '../../shared/const/conts';
import { Page } from '../../shared/classes/page';
import { CorporateEmployee } from '../../shared/classes/corporate-employee';
import { PagedData } from '../../shared/classes/page-data';

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


  public getResults(page: Page): Observable<PagedData<CorporateEmployee>> {
    return of(companyData).pipe(
      delay(350),
      map(data => this.getPagedData(page))
    );
  }

  private getPagedData(page: Page) {
    let pagedData =  new PagedData<CorporateEmployee>();
    page.totalElements = companyData.length;
    page.totalPages = page.totalElements / page.size;
    let start = page.pageNumber * page.size;
    let end = Math.min((start + page.size), page.totalElements);
    for (let i = start; i < end; i++){
        let jsonObj = companyData[i];
        let employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
        pagedData.data.push(employee);
    }
    pagedData.page = page;
    return pagedData;
  }
}
