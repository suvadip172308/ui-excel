import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ApiService } from '../../services/api/api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-details-info',
  templateUrl: './details-info.component.html',
  styleUrls: ['./details-info.component.scss']
})
export class DetailsInfoComponent implements OnInit {
  @ViewChild('infoDrawer', {static: false}) infoDrawer: any;
  detailsInfo: any;
  
  @Input() entityId: string;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    console.log("Hiiiii............");
  }

  open() {
    this.getTransaction(this.entityId);
    this.infoDrawer.open();
  }

  close() {
    this.infoDrawer.close();
  }

  getTransaction(id: string) {
    if (!id) {
      return;
    }
    //this.spinnerService.start();
    this.apiService.getCall(`/transaction/${id}`)
      .pipe(
        take(1)
      ).subscribe(data => {
        this.detailsInfo = data;
      });
  }
}
