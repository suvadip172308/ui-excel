import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Register';
  userName = '';
  name = '';
  password = '';
  confirmPassword = '';
  companies = [];
  isUserNameValid = false;
  isNameValid = false;
  isPasswordValid = false;
  isConfirmPassword = false;
  isCompaniesValid = false;
  displayIcon = false;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private spinnerService: SpinnerService,
    private _router: Router,
  ) { }

  ngOnInit() {}

  isValidUserName(userName: string): boolean {
    const pattern = /^[a-zA-Z0-9_-]{3,50}$/;
    return pattern.test(userName);
  }

  isValidName(name: string) {
    const pattern = /^[a-zA-Z ]{3,50}$/;
    return pattern.test(name);
  }

  isValidPassword(password: string) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,25})/;
    return pattern.test(password);
  }

  isPasswordConfirm() {
    return this.password === this.confirmPassword;
  }

  isValidCompanies(companies: string[]) {
    return companies && (companies.length > 0) && (companies.length < 100);
  }

  onInput(value: any, inputType: string) {
    switch(inputType) {
      case 'userName':
        this.userName = value;
        break;
      case 'name':
        this.name = value;
        break;
      case 'password':
        this.password =value;
        break;
      case 'confirmPassword':
        this.confirmPassword = value;
        break;
      case 'companies':
        this.companies = value.split(/[ ,]+/);
        break;
      default:
        return;
    }
  }

  getIcon(isValid: boolean) {
    return isValid ? 'check_box' : 'error_outline';
  }

  onReset() {
    this.displayIcon = false;
    this.userName = '';
    this.name = '';
    this.password = '';
    this.confirmPassword = '';
    this.companies = [];
  }

  onRegister() {
    this.isUserNameValid = this.isValidUserName(this.userName);
    this.isNameValid = this.isValidName(this.name);
    this.isPasswordValid = this.isValidPassword(this.password);
    this.isConfirmPassword = this.isPasswordConfirm();
    this.isCompaniesValid = this.isValidCompanies(this.companies);

    if ( !this.isUserNameValid
      || !this.isNameValid
      || !this.isPasswordValid
      || !this.isConfirmPassword
      || !this.isCompaniesValid
    ) {
      this.displayIcon = true;
      return;
    }

    this.displayIcon = false;

    const body = {
      userName: this.userName,
      name: this.name,
      password: this.password,
      companies: this.companies
    };

    this.spinnerService.open();
    this.apiService.postCall('/users', body).pipe(
      finalize(() => this.spinnerService.close())
    ).subscribe(() => {
      this.commonService.openSnackBar('Registration Successful');
      this._router.navigate(['login']);
    }, (err) => {
      return this.commonService.openSnackBar(err.message || 'Unknown Error');
    });
  }
}
