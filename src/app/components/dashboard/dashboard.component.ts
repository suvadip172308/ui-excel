import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  get name() {
    const name = this.authService.getLocalStore('name');
    return `Hi ${name}`;
  }

  onLogout() {
    this.authService.removeToken();
    this.authService.removeLocalStore('userName');
    this.authService.removeLocalStore('name');

    this._router.navigate(['login']);
  }
}
