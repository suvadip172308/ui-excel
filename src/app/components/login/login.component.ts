import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import {CommonService } from '../../services/common/common.service';
import { Login } from '../../models/common.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = "";
  password = "";
  durationInSeconds = 5;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private commonService: CommonService,
    private _router: Router,
  ) { }

  ngOnInit() {
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
  
    this.apiService.postCall('/auth', body).subscribe((res: HttpResponse<Login>) => {
      const token = res.headers.get('Authorization');
      const body = res.body;

      if (token) {
        this.authService.setToken(token);
        this.authService.setLocalStore('username', body.userName);
        this.authService.setLocalStore('name', body.name);
        this._router.navigate(['dashboard']);
      }

    }, (err) => {
      return this.commonService.openSnackBar('Invalid Username or Password');
    });
  }

}
