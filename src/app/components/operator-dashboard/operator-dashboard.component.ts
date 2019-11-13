import { Component, OnInit, ViewChild } from '@angular/core';

import { Page } from '../../shared/classes/page';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-operator-dashboard',
  templateUrl: './operator-dashboard.component.html',
  styleUrls: ['./operator-dashboard.component.scss']
})
export class OperatorDashboardComponent implements OnInit {
  @ViewChild('dataTable', {static: true}) table;
  isLoading: boolean = false;
  page = new Page();
  rows = [];

  constructor(private commonService: CommonService) {
    this.setPage({offset: 0, pageSize: 10});
  }

  ngOnInit() {}

  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    this.commonService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;

      // let rows = this.rows;
      // if (rows.length !== pagedData.page.totalElements) {
      //   rows = Array.apply(null, Array(pagedData.page.totalElements));
      //   rows = rows.map((x, i) => this.rows[i]);
      // }

      // // calc start
      // const start = this.page.pageNumber * this.page.size;

      // // set rows to our new rows
      // pagedData.data.map((x, i) => rows[i + start] = x);
      // this.rows = rows;
      this.rows = pagedData.data;
      this.isLoading = false;
    });
  }

}
