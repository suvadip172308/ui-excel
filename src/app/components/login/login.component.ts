import { Component, OnInit } from '@angular/core';
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

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private commonService: CommonService,
    private spinnerService: SpinnerService,
    private _router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {}

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
        this.store.dispatch(new AddUser({userName: body.userName, name: body.name}));

        this._router.navigate(['dashboard']);
      }
    }, (err) => {
      return this.commonService.openSnackBar('Invalid Username or Password');
    });
  }

}
