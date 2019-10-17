import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  doLogin() {
    const body = {
      userName: this.userName,
      password: this.password
    };
  
    this.apiService.postCall('/auth', body).subscribe((res: HttpResponse<any>) => {
      const token = res.headers.get('Authorization');
      if (token) this.authService.setToken(token);
    }, (err) => {
      console.log('Error :', err);
    });
  }

}
