import { Component, OnInit, HostListener } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonService } from '../../services/common/common.service';
import { Login } from '../../models/common.model';
import { AddUser } from '../../actions/login.actions';
import { AppState } from '../../models/common.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = "";
  password = "";
  ENTER_KEYCODE = 13;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private commonService: CommonService,
    private spinnerService: SpinnerService,
    private _router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ENTER_KEYCODE) {
      this.doLogin();
    }
  }

  doLogin() {
    const userName = this.userName.trim();
    const password = this.password.trim();
    
    if(!userName || !password) {
      this.commonService.openSnackBar('Please Provide Credentials');
      return;
    }

    const body = {
      userName,
      password  // make it encrypted later
    };
    
    this.spinnerService.start();

    this.apiService.postCall('/auth', body).pipe(
      finalize(() => this.spinnerService.end())
    ).subscribe((res: HttpResponse<Login>) => {
      const token = res.headers.get('Authorization');
      const body = res.body;

      if (token) {
        this.authService.setToken(token);
        const userName = body.userName;
        const name = body.name;
        const isAdmin = this.authService.isAdmin();

        this.authService.setLocalStore('userName', userName);
        this.authService.setLocalStore('name', name);
        this.store.dispatch(new AddUser({userName, name, isAdmin}));

        this._router.navigate(['dashboard']);
      }
    }, (err) => {
      return this.commonService.openSnackBar('Invalid Username or Password');
    });
  }

}
