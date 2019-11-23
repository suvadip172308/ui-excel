import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { UserState, AppState } from '../../models/common.state';
import { RemoveUser } from '../../actions/login.actions';
import { selectUser } from '../../reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private data$: Observable<UserState>;
  
  constructor(
    private authService: AuthService,
    private _router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.data$ = this.store.pipe(select(selectUser));
  }

  get isLoggedIn() {
    return this.authService.isTokenAvailable();
  }

  getName(name: string) {
    return `Hi ${name}`;
  }

  onLogout() {
    this.authService.removeToken();
    // this.authService.removeLocalStore('userName');
    // this.authService.removeLocalStore('name');
    this.store.dispatch(new RemoveUser());

    this._router.navigate(['login']);
  }
}
