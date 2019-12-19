import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { UserState, AppState } from '../../models/common.state';
import { selectUser } from '../../reducers';
import { AuthService } from '../../services/auth/auth.service';
import { RemoveUser } from '../../actions/login.actions';
import { LINKS } from '../../shared/const/conts';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent {
  data$: Observable<UserState>;
  isOpened = false;
  links = LINKS;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private _router: Router,
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.data$ = this.store.pipe(select(selectUser));
  }

  getName(name: string) {
    return name ? `Hi, ${name}` : '';
  }

  getRole(role: string) {
    return role ? 'Admin' : 'Operator';
  }

  onNavigation(link) {    
    switch(link.name) {
      case 'home':
        this._router.navigate(['dashboard']);
        break;
      
      case 'transaction':
        this._router.navigate(['dashboard', 'transaction']);
        break;
      
      case 'create-transaction':
        this._router.navigate(
          ['dashboard','transaction', 'new'],
          { queryParams: { mode: 'create'}}
        );
        break;
      
      case 'retailer':
        this._router.navigate(['dashboard', 'retailer']);
        break;
      
      case 'create-retailer':
        this._router.navigate(
          ['dashboard','retailer', 'new'],
          { queryParams: { mode: 'create'}}
        );
        break;
      
      case 'path':
        this._router.navigate(['dashboard', 'path']);
        break;
      
      case 'create-path':
        this._router.navigate(
          ['dashboard','path', 'new'],
          { queryParams: { mode: 'create'}}
        );
        break;
      
      default:
        return;
    }
  }

  onLogout() {
    this.authService.removeToken();
    this.authService.removeLocalStore('userName');
    this.authService.removeLocalStore('name');
    this.store.dispatch(new RemoveUser());

    this._router.navigate(['login']);
  }
}
