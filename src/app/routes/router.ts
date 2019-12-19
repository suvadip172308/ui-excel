import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TransactionDetailsComponent } from '../components/transaction-details/transaction-details.component';
import { TransactionListComponent } from '../components/transaction-list/transaction-list.component';
import { RetailerListComponent } from '../components/retailer-list/retailer-list.component';
import { RetailerDetailsComponent } from '../components/retailer-details/retailer-details.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent 
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'transaction',
        pathMatch: 'full'
      },
      {
        path: 'transaction',
        component: TransactionListComponent
      },
      {
        path: 'transaction/:id',
        component: TransactionDetailsComponent
      },
      {
        path: 'transaction/new',
        component: RegisterComponent 
      },
      {
        path: 'retailer',
        component: RetailerListComponent
      },
      {
        path: 'retailer/:id',
        component: RetailerDetailsComponent
      }
    ]
  }
];