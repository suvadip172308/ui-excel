import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../../services/common/common.service';
import { ApiService } from 'src/app/services/api/api.service';
import { PAGE_SIZE } from '../../shared/const/conts';
import { Transaction } from '../../models/common.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-operator-dashboard',
  templateUrl: './operator-dashboard.component.html',
  styleUrls: ['./operator-dashboard.component.scss']
})
export class OperatorDashboardComponent implements OnInit {
  @ViewChild('dataTable', {static: true}) table;
  isLoading: boolean = false;
  pageSize = PAGE_SIZE;
  totalElements = 0;
  pageNumber = 0;
  rows = [];
  columns = [];
  selected = [];

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
    private _router: Router
  ) {
    this.setPage({offset: 0, pageSize: this.pageSize });
  }

  ngOnInit() {
    
  }

  getSerialNo(pageInfo, index) {
    return (pageInfo.offset * pageInfo.pageSize) + index + 1;
  }

  setPage(pageInfo) {
    this.isLoading = true;
    this.pageNumber = pageInfo.offset;
    this.pageSize = pageInfo.pageSize;

    const queryParam = [
      {key: 'offset', value: this.pageNumber + 1},
      {key: 'size', value: this.pageSize}
    ];

    this.apiService.getCall('/transaction', queryParam).subscribe(response => {
      this.rows = this.getTransactionData(response['data'], pageInfo);
      this.totalElements = response['totalElements'];
      this.isLoading = false;
    });
  }

  getTransactionData(transactions, pageInfo): Transaction[] {
    return transactions.map((transaction, index) => {
      return {
        serialNo: this.getSerialNo(pageInfo, index),
        date: this.commonService.getDate(transaction.creationDate),
        retailerName: transaction.retailerName,
        companyName: transaction.companyName,
        routeName: transaction.routeName,
        agentName: transaction.agentName,
        invoiceAmount: transaction.invoiceAmount,
        payment: transaction.payment
      }
    });
  }

  onSelectRow(event) {
    if(event.type !== 'click') {
      return;
    }

    console.log('Hello:', event.row);
    const id = event.row.id;
    this._router.navigate([`dashboard/transaction/${id}`]);
  }
}
