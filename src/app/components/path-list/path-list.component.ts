import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { PAGE_SIZE } from '../../shared/const/conts';
import { ApiService } from '../../services/api/api.service';
import { CommonService } from '../../services/common/common.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-path-list',
  templateUrl: './path-list.component.html',
  styleUrls: ['./path-list.component.scss']
})
export class PathListComponent implements OnInit {

  totalElements = 0;
  pageSize = PAGE_SIZE;
  isLoading = false;
  pageNumber = 0;
  rows = [];
  columns = [];
  selected = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  isDeleteMode: boolean;

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
    private auth: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((q) => {
      this.isDeleteMode = q['mode'] === 'delete' && this.auth.isAdmin() ? true : false;
    });
  }

  ngOnInit() {
    this.setPage({ offset: 0, pageSize: this.pageSize });
  }

  setPage(pageInfo) {
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
    if (this.isDeleteMode) return;
    if (event.type !== 'click') {
      return;
    }

    const id = event.row.pathId;
    this._router.navigate(
      ['dashboard', 'path', id],
      { queryParams: { mode: 'display' } }
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

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  delete() {
    this.commonService.openConfirmDialog('This can\'t be undone. Are you sure to delete?')
      .afterClosed().subscribe((response) => {
        if (response) {
          const ids = this.selected.map((i) => i.pathId);
          this.deletePath(ids);
        }
      })
  }

  async deletePath(ids: string[]) {
    if (!this.auth.isAdmin()) return;
    try {
      await this.apiService.deleteCall(`/path/`, { pathIds: ids }).toPromise();
      this.commonService.openSnackBar(ids.length > 1 ? `${ids.length} records deleted.` : `1 record deleted.`);
      this.selected = [];
      this.setPage({ offset: 0, pageSize: this.pageSize });
    } catch (error) {
      window.alert('Something went wrong! Try again later.')
    }
  }

}
