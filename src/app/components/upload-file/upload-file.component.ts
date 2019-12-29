import { Component, OnInit } from '@angular/core';
import { MatOption, MatSelectChange } from '@angular/material';

import { CommonService } from '../../services/common/common.service';
import { UPLOAD_TYPES, FILE_SELECTION } from '../../shared/const/conts';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  uploadFileTypes = UPLOAD_TYPES;
  selectedType = null;
  file: any = null;
  fileName = FILE_SELECTION;
  
  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {}

  onSelectFileType(fileType) {
    this.selectedType = fileType;
  }

  fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.file = fileInputEvent.target.files[0];
    this.fileName = this.file.name;
  }

  onClear() {
    this.file = null;
    this.fileName = FILE_SELECTION;
  }

  onUpload() {
    if (!this.file || !this.selectedType) {
      this.commonService.openSnackBar('Select a file or file type');
      return;
    }
  }

}
