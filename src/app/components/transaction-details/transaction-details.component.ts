import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction: any;
  
  constructor(
    private apiService: ApiService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.getTransaction(param['id']);
    });

  }

  getTransaction(id: string) {
    if (!id) {
      return;
    }

    this.spinnerService.start();
    this.apiService.getCall(`/transaction/${id}`)
    .pipe(
      take(1),
      finalize(() => this.spinnerService.end())
    ).subscribe(data => {
      this.transaction = data;
    });
  }

  onBack() {
    this._router.navigate(['dashboard']);
  }
}
