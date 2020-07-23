import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { CommonService } from '../../services/common/common.service';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { PAGE_SIZE } from '../../shared/const/conts';
import { Transaction } from '../../models/common.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  isLoading: boolean = false;
  pageSize = PAGE_SIZE;
  totalElements = 0;
  pageNumber = 0;
  rows = [];
  columns = [];
  selected = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  isDeleteMode: boolean;
  showFiller = false;

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
    public auth: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((q) => {
      this.isDeleteMode = q['mode'] === 'delete' && this.auth.isAdmin() ? true : false;
      this.setPage({ offset: 0, pageSize: this.pageSize });
    });
  }

  displayCheck(row) {
    return !row.hasAdminRight ? false : row.deletion ? true : !row.isApproved;
  }

  setPage(pageInfo) {
    this.isLoading = true;
    this.pageNumber = pageInfo.offset;
    this.pageSize = pageInfo.pageSize;

    const queryParam = [
      { key: 'offset', value: this.pageNumber + 1 },
      { key: 'size', value: this.pageSize }
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
        id: transaction._id,
        serialNo: this.commonService.getSerialNo(pageInfo, index),
        date: this.commonService.getDate(transaction.creationDate),
        retailerName: transaction.retailerName,
        companyName: transaction.companyName,
        routeName: transaction.routeName,
        agentName: transaction.agentName,
        invoiceAmount: transaction.invoiceAmount,
        payment: transaction.payment,
        isApproved: transaction.isApproved,
        hasAdminRight: this.auth.isAdmin(),
        deletion: this.isDeleteMode
      }
    });
  }

  // onSelectRow(event) {
  //   if (this.isDeleteMode) return;
  //   if (event.type !== 'dblclick') {
  //     return;
  //   }

  //   const id = event.row.id;
  //   // this._router.navigate(
  //   //   ['dashboard', 'transaction', id],
  //   //   { queryParams: { mode: 'display' } }
  //   // );

  //   console.log("HI.....");
  // }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    console.log("Hello ....");
  }

  approve() {
    const ids = this.selected.map(i => i.id);
    if (!this.auth.isAdmin()) return;
    const payload = {
      "transactionIds": ids
    };
    this.apiService.putCall(`/transaction/approve`, payload)
      .subscribe((v) => {
        if (v.status === 200) {
          this.commonService.openSnackBar(`Transaction(s) approved.`);
          this.setPage({ offset: 0, pageSize: this.pageSize });
          this.selected = [];
        }
      });
  }

  delete() {
    this.commonService.openConfirmDialog('This can\'t be undone. Are you sure to delete?')
      .afterClosed().subscribe((response) => {
        if (response) {
          const ids = this.selected.map((i) => i.id);
          this.deleteTransactions(ids);
        }
      })
  }

  async deleteTransactions(ids: string[]) {
    if (!this.auth.isAdmin()) return;
    try {
      await this.apiService.deleteCall(`/transaction`, { transactionIds: ids }).toPromise();
      this.commonService.openSnackBar(ids.length > 1 ? `${ids.length} records deleted.` : `1 record deleted.`);
      this.selected = [];
      this.setPage({ offset: 0, pageSize: this.pageSize });
    } catch (error) {
      window.alert('Something went wrong! Try again later.')
    }
  }

}
