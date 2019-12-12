import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PAGE_SIZE } from '../../shared/const/conts';
import { ApiService } from 'src/app/services/api/api.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrls: ['./retailer-list.component.scss']
})
export class RetailerListComponent implements OnInit {
  rows = [];
  totalElements = 0;
  pageSize = PAGE_SIZE;
  isLoading = false;
  pageNumber = 0;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.onSetPage({offset: 0, pageSize: this.pageSize });
  }

  onSetPage(pageInfo) {
    this.isLoading = true;
    this.pageNumber = pageInfo.offset;
    this.pageSize = pageInfo.pageSize;

    const queryParam = [
      { key: 'offset', value: this.pageNumber + 1 },
      { key: 'size', value: this.pageSize }
    ];

    this.apiService.getCall('/retailer/', queryParam).subscribe(response => {
      this.rows = this.getRetailer(response['data'], pageInfo);
      this.totalElements = response['totalElements'];
      this.isLoading = false;
    });
  }

  onSelectRow(event) {
    if(event.type !== 'click') {
      return;
    }

    const id = event.row.retailerId;
    this._router.navigate(
      ['dashboard', 'retailer', id],
      { queryParams: { mode: 'display'}}
    );
  }

  getRetailer(retailers, pageInfo) {
    return retailers.map((retailer, index) => {
      return {
        id: retailer._id,
        serialNo: this.commonService.getSerialNo(pageInfo, index),
        retailerId: retailer.retailerId,
        retailerName: retailer.retailerName,
        companyName: retailer.companyName,
        balance: retailer.balance,
        isActivated: retailer.isActivated
      };
    });
  }

}
