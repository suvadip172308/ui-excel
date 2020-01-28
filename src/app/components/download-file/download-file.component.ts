import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { take, finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { UPLOAD_TYPES, PAGE_SIZE } from '../../shared/const/conts';
import { ApiService } from '../../services/api/api.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonService } from '../../services/common/common.service';

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
    private spinnerService: SpinnerService,
    private commonService: CommonService
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

  isInputValid() {
    if (!this.selectedType) {
      this.commonService.openSnackBar('Please select download type');
      return false;
    } else if (this.toPage < this.fromPage) {
      this.commonService.openSnackBar('Select bigger value in To Page field');
      return false;
    }

    return true;
  }

  onDownload() {
    if (!this.isInputValid()) {
      return;
    }

    const body = {
      collection: this.selectedType,
      pageSize: PAGE_SIZE,
      fromPage: this.fromPage,
      toPage: this.toPage
    };

    this.apiService.download('/file/download', body).subscribe(res => {
      saveAs(res, `${this.selectedType}.xlsx`);
    });
  }
}
