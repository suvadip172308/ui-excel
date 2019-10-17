import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import {CommonService } from '../../services/common/common.service';

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
  
    this.apiService.postCall('/auth', body).subscribe((res: HttpResponse<any>) => {
      const token = res.headers.get('Authorization');
      if (token) this.authService.setToken(token);
    }, (err) => {
      this.commonService.openSnackBar('Invalid Username or Password');
    });
  }

}
