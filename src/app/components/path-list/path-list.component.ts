import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PAGE_SIZE } from '../../shared/const/conts';
import { ApiService } from 'src/app/services/api/api.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {
  rows = [];
  totalElements = 0;
  pageSize = PAGE_SIZE;
  isLoading = false;
  pageNumber = 0;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private _router: Router
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

    this.apiService.getCall('/path/', queryParam).subscribe(response => {
      this.rows = this.getPath(response['data'], pageInfo);
      this.totalElements = response['totalElements'];
      this.isLoading = false;
    });
  }

  onSelectRow(event) {
    if(event.type !== 'click') {
      return;
    }

    const id = event.row.pathId;
    this._router.navigate(
      ['dashboard', 'path', id],
      { queryParams: { mode: 'display'}}
    );
  }

  getPath(paths, pageInfo) {
    return paths.map((path, index) => {
      return {
        id: path._id,
        serialNo: this.commonService.getSerialNo(pageInfo, index),
        pathId: path.pathId,
        pathName: path.pathName,
        isActive: path.isActive
      };
    });
  }

}
