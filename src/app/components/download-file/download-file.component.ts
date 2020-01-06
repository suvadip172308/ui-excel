import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { take, finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { UPLOAD_TYPES, PAGE_SIZE } from '../../shared/const/conts';
import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})
export class DownloadFileComponent implements OnInit {
  downloadFileTypes = UPLOAD_TYPES;
  selectedType = null;
  toPage = 1;
  fromPage = 1;

  constructor(
    private _http: HttpClient,
    private apiService: ApiService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {}

  onSelectFileType(fileType: string) {
    this.selectedType = fileType;
    console.log(fileType);
  }

  onInput(pageNo: number, type: string) {
    if (type === 'to') {
      this.toPage = pageNo;
    } else if (type === 'from') {
      this.fromPage = pageNo;
    }
  }

  onDownload() {
    const body = {
      collection: this.selectedType,
      pageSize: PAGE_SIZE,
      fromPage: this.fromPage,
      toPage: this.toPage
    };

    this._http.post(
      this.apiService.getUrl('/file/download'),
      body,
      {
        responseType: 'blob',
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(
      take(1),
      finalize(() => this.spinnerService.end())
    ).subscribe(
      res => saveAs(res)
    );
  }
}
