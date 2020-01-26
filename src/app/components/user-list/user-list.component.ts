import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../../services/common/common.service';
import { ApiService } from 'src/app/services/api/api.service';
import { PAGE_SIZE } from '../../shared/const/conts';
import { User } from '../../models/common.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

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
  ) { }

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

    this.apiService.getCall('/users', queryParam).subscribe((response: User[]) => {
      this.rows = this.getUsersData(response, pageInfo);
      this.totalElements = response.length;
      this.isLoading = false;
    });
  }

  getUsersData(users, pageInfo): User[] {
    return users.map((user, index) => {
      const u = { ...user };
      u['serialNo'] = this.commonService.getSerialNo(pageInfo, index);
      return u;
    });
  }

  onAct(row, actionCode: string) {
    const id = row._id;
    switch (actionCode) {
      case '1':
        this.activateUserStatus(id, true);
        break;
      case '2':
        this.activateUserStatus(id, false);
        break;
      case '3':
        if (confirm("This action can't be undone. Are you sure to delete?")) {
          this.deleteUser(id);
        }
        break;
      default:
        break;
    }
    // this._router.navigate(
    //   ['dashboard', 'transaction', id],
    //   { queryParams: { mode: 'display' } }
    // );
  }

  async activateUserStatus(userId: string, isActivate: boolean) {
    try {
      await this.apiService.putCall(`/users/status/${userId}`, { isActivate }).toPromise();
      this.setPage({ offset: 0, pageSize: this.pageSize });
    } catch (error) {
      window.alert('Something went wrong! Try again later.')
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.apiService.deleteCall(`/users/${userId}`).toPromise();
      this.setPage({ offset: 0, pageSize: this.pageSize });
    } catch (error) {
      window.alert('Something went wrong! Try again later.')
    }
  }

}
