import { Component, OnInit } from '@angular/core';

import { PAGE_SIZE } from '../../shared/const/conts';
import { ApiService } from 'src/app/services/api/api.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {
  rows = [];
  totalElements = 10;
  pageSize = PAGE_SIZE;
  isLoading = false;
  pageNumber = 0;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) { }

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

    this.apiService.getCall('/retailers/', queryParam).subscribe(response => {
      this.rows = this.getRetailer(response, pageInfo);
      this.isLoading = false;
    });
  }

  onSelectRow(event) {
    console.log('Hiiiii');
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
      }
    });
  }

}
