import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth/auth.service';
import { AddUser } from '../../actions/login.actions';
import { AppState } from '../../models/common.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private _router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    /* On page refresh */
    const userName = this.authService.getLocalStore('userName');
    const name = this.authService.getLocalStore('name');
    const isAdmin = this.authService.isAdmin();
    this.store.dispatch(new AddUser({ userName, name, isAdmin }));

    // this._router.navigate(['dashboard','transaction']);
  }
}

