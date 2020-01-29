import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { take, finalize, filter } from 'rxjs/operators';

import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonService } from '../../services/common/common.service';
import { AuthService } from '../../services/auth/auth.service';
import { Mode } from '../../models/common.model';

@Component({
  selector: 'app-retailer-details',
  templateUrl: './retailer-details.component.html',
  styleUrls: ['./retailer-details.component.scss']
})
export class RetailerDetailsComponent implements OnInit {
  mode = Mode.display;
  retailerId: string;
  retailer: any
  updationObject = {};

  constructor(
    private apiService: ApiService,
    public auth: AuthService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private _router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.mode))
      .subscribe(params => {
        const mode = params.mode.trim();
        this.mode = mode;
      });

    if (!this.isCreateMode) {
      this.route.params.subscribe(param => {
        this.retailerId = param['id'];
        this.getRetailer(this.retailerId);
      });
    }
  }

  get isCreateMode() {
    return this.mode === Mode.create;
  }

  get isEditMode() {
    return this.mode === Mode.edit;
  }

  get isDisplayMode() {
    return this.mode === Mode.display;
  }

  getRetailer(id: string) {
    if (!id) {
      return;
    }

    this.spinnerService.start();
    this.apiService.getCall(`/retailer/${id}`)
      .pipe(
        take(1),
        finalize(() => this.spinnerService.end())
      ).subscribe(data => {
        this.retailer = data;
      });
  }

  onActivate() {
    if (!this.auth.isAdmin()) return;
    const payload = {
      "retailerIds": [this.retailerId]
    };
    this.apiService.putCall(`/retailer/activate`, payload)
      .subscribe((v) => {
        if (v.status === 200) {
          this.commonService.openSnackBar('Retailer activated.');
          this.getRetailer(this.retailerId);
        }
      });
  }

  onBack() {
    if (this.isEditMode) {
      this.mode = Mode.display
      return;
    }

    this._router.navigate(['dashboard', 'retailer']);
  }

  onEdit(retailer) {
    this.mode = Mode.edit;
  }

  onInput(value, prop) {
    if (!value) {
      return;
    }

    switch (prop) {
      case 'retailerId':
        this.updationObject['retailerId'] = value;
        break;
      case 'retailerName':
        this.updationObject['retailerName'] = value;
        break;
      case 'companyName':
        this.updationObject['companyName'] = value;
        break;
      case 'balance':
        this.updationObject['balance'] = value;
        break;
    }
  }

  onDone() {
    const isEmpty = this.commonService.isObjectEmpty(this.updationObject);

    if (isEmpty) {
      this.commonService.openSnackBar('No option edited');
      return;
    }

    this.spinnerService.start();
    this.apiService.updateCall(
      '/retailer',
      this.retailerId,
      this.updationObject
    ).pipe(
      finalize(() => this.spinnerService.end())
    ).subscribe(response => {
      this.retailer = response;
      this.mode = Mode.display;
    });
  }

  onCreate() {
    const isEmpty = this.commonService.isObjectEmpty(this.updationObject);

    if (isEmpty) {
      this.commonService.openSnackBar('All fiels are empty');
      return;
    }

    this.spinnerService.start();
    this.apiService.postCall(
      '/retailer',
      this.updationObject
    ).pipe(
      finalize(() => this.spinnerService.end())
    ).subscribe(response => {
      this.mode = Mode.display;
      this._router.navigate(['dashboard', 'retailer']);
    });
  }

  onDelete() {
    this.commonService.openConfirmDialog('This can\'t be undone. Are you sure to delete?')
      .afterClosed().subscribe((response) => {
        if (response) {
          const payload = {
            "retailerIds": [this.retailerId]
          }
          this.apiService.deleteCall('/retailer', payload)
            .subscribe(() => {
              this.commonService.openSnackBar('Retailer deleted.');
              this._router.navigate(['dashboard', 'retailer']);
            });
        }
      })
  }
}
