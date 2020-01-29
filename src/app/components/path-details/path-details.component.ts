import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { take, finalize, filter } from 'rxjs/operators';

import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonService } from '../../services/common/common.service';
import { Mode } from '../../models/common.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-path-details',
  templateUrl: './path-details.component.html',
  styleUrls: ['./path-details.component.scss']
})
export class PathDetailsComponent implements OnInit {
  mode = Mode.display;
  pathId: string;
  path: any
  updationObject = {};

  constructor(
    private apiService: ApiService,
    public auth: AuthService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private _router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(params => params.mode))
      .subscribe(params => {
        const mode = params.mode.trim();
        this.mode = mode;
      });

    if (!this.isCreateMode) {
      this.route.params.subscribe(param => {
        this.pathId = param['id'];
        this.getPath(this.pathId);
      });
    }
  }

  get isCreateMode() {
    return this.mode === Mode.create;
  }

  get isEditMode() {
    return this.mode === Mode.edit;
  }

  get isDisplayMode() {
    return this.mode === Mode.display;
  }

  getPath(id: string) {
    if (!id) {
      return;
    }

    this.spinnerService.start();
    this.apiService.getCall(`/path/${id}`)
      .pipe(
        take(1),
        finalize(() => this.spinnerService.end())
      ).subscribe(data => {
        this.path = data;
      });
  }

  onActivate() {
    if (!this.auth.isAdmin()) return;
    const payload = {
      "pathIds": [this.pathId]
    };
    this.apiService.putCall(`/path/activate`, payload)
      .subscribe((v) => {
        if (v.status === 200) {
          this.commonService.openSnackBar('Path activated.');
          this.getPath(this.pathId)
        }
      });
  }

  onBack() {
    if (this.isEditMode) {
      this.mode = Mode.display
      return;
    }

    this._router.navigate(['dashboard', 'path']);
  }

  onEdit(retailer) {
    this.mode = Mode.edit;
  }

  onInput(value, prop) {
    if (!value) {
      return;
    }

    switch (prop) {
      case 'pathId':
        this.updationObject['pathId'] = value;
        break;
      case 'pathName':
        this.updationObject['pathName'] = value;
        break;
    }
  }

  onDone() {
    const isEmpty = this.commonService.isObjectEmpty(this.updationObject);

    if (isEmpty) {
      this.commonService.openSnackBar('No option edited');
      return;
    }

    this.spinnerService.start();
    this.apiService.updateCall(
      '/path',
      this.pathId,
      this.updationObject
    ).pipe(
      finalize(() => this.spinnerService.end())
    ).subscribe(response => {
      this.path = response;
      this.mode = Mode.display;
    });
  }

  onCreate() {
    const isEmpty = this.commonService.isObjectEmpty(this.updationObject);

    if (isEmpty) {
      this.commonService.openSnackBar('All fiels are empty');
      return;
    }

    this.spinnerService.start();
    this.apiService.postCall(
      '/path',
      this.updationObject
    ).pipe(
      finalize(() => this.spinnerService.end())
    ).subscribe(response => {
      this.mode = Mode.display;
      this._router.navigate(['dashboard', 'path']);
    });
  }

  onDelete() {
    this.commonService.openConfirmDialog('This can\'t be undone. Are you sure to delete?')
      .afterClosed().subscribe((response) => {
        if (response) {
          const payload = {
            "pathIds": [this.pathId]
          }
          this.apiService.deleteCall('/path/', payload)
            .subscribe(() => {
              this.commonService.openSnackBar('Path deleted.');
              this._router.navigate(['dashboard', 'path']);
            });
        }
      })
  }

}
