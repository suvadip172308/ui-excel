import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = "";
  password = "";

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  doLogin() {
    const body = {
      userName: this.userName,
      password: this.password
    };
  
    this.apiService.postCall('/auth', body);
  }

}
