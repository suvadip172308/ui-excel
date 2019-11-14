import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }
}
