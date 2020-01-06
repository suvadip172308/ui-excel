import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MaterialModule } from './module/material.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HeaderNavbarComponent } from './components/header-navbar/header-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RetailerListComponent } from './components/retailer-list/retailer-list.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { RetailerDetailsComponent } from './components/retailer-details/retailer-details.component';
import { PathListComponent } from './components/path-list/path-list.component';
import { PathDetailsComponent } from './components/path-details/path-details.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { OperatorListComponent } from './components/operator-list/operator-list.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DownloadFileComponent } from './components/download-file/download-file.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SpinnerComponent,
    FooterComponent,
    TransactionDetailsComponent,
    TransactionListComponent,
    HeaderNavbarComponent,
    RetailerListComponent,
    DataTableComponent,
    RetailerDetailsComponent,
    PathListComponent,
    PathDetailsComponent,
    UploadFileComponent,
    OperatorListComponent,
    ConfirmDialogComponent,
    DownloadFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    NgxDatatableModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    SpinnerComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
