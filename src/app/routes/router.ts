import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TransactionDetailsComponent } from '../components/transaction-details/transaction-details.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent },
  { 
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/transaction/:id',
    component: TransactionDetailsComponent,
    pathMatch: 'full'
  }
];