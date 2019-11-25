import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  isEditMode = false;
  isCreateMode = false;
  updationObject = {};
  transactionId: string;
  transaction: any;
  
  constructor(
    private apiService: ApiService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.transactionId = param['id'];
      this.getTransaction(this.transactionId);
    });

  }

  getTransaction(id: string) {
    if (!id) {
      return;
    }

    this.spinnerService.start();
    this.apiService.getCall(`/transaction/${id}`)
    .pipe(
      take(1),
      finalize(() => this.spinnerService.end())
    ).subscribe(data => {
      this.transaction = data;
    });
  }

  onBack() {
    if (this.isEditMode) {
      this.isEditMode = false;
      return;
    }
    this._router.navigate(['dashboard']);
  }

  onEdit(transaction) {
    this.isEditMode = true;
  }

  onInput(value, prop) {
    if (!value) {
      return;
    }

    switch(prop) {
      case 'retailerId':
        this.updationObject['retailerId'] = value;
        break;
      case 'retailerName':
        this.updationObject['retailerName'] = value;
        break;
      case 'companyName':
        this.updationObject['companyName'] = value;
        break;
      case 'routeCode':
        this.updationObject['routeCode'] = value;
        break;
      case 'routeName':
        this.updationObject['routeName'] = value;
        break;
      case 'invoiceId':
        this.updationObject['invoiceId'] = value;
        break;
      case 'invoiceAmount':
        this.updationObject['invoiceAmount'] = value;
        break;
      case 'payment':
        this.updationObject['payment'] = value;
        break;
      case 'agentName':
        this.updationObject['agentName'] = value;
        break;
      case 'operatorName':
        this.updationObject['operatorName'] = value;
        break;
    }
  }

  onDone() {
    this.spinnerService.start();
    this.apiService.updateCall(
      '/transaction',
      this.transactionId,
      this.updationObject
    ).pipe(
      finalize(() => this.spinnerService.end())
    ).subscribe(response => {
      this.transaction = response;
      this.isEditMode = false;
    });
  }
}
