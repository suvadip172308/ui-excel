import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonService } from '../../services/common/common.service';
import { ApiService } from 'src/app/services/api/api.service';
import { PAGE_SIZE } from '../../shared/const/conts';
import { Transaction } from '../../models/common.model';

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

  constructor(
    private commonService: CommonService,
    private apiService: ApiService
  ) {
    this.setPage({offset: 0, pageSize: this.pageSize });
  }

  ngOnInit() {
    this.columns = [
      { name: 'Retailer Name'},
      { name: 'Company Name'},
      { name: 'Route Name'},
      { name: 'Agent Name'},
      { name: 'Invoice Amount'},
      { name: 'Payment'},
      { name: 'Created On'}
    ]
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
      this.rows = this.getTransactionData(response['data']);
      this.totalElements = response['totalElements'];
      this.isLoading = false;
    });
  }

  getTransactionData(transactions): Transaction[] {
    return transactions.map(transaction => {
      return {
        createdOn: this.commonService.getDate(transaction.creationDate),
        retailerName: transaction.retailerName,
        companyName: transaction.companyName,
        routeName: transaction.routeName,
        agentName: transaction.agentName,
        invoiceAmount: transaction.invoiceAmount,
        payment: transaction.payment
      }
    });
  }
}
