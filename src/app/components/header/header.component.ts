import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  get isLoggedIn() {
    return this.authService.isTokenAvailable();
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
