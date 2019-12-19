import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() rows: any;
  @Input() totalElements: number;
  @Input() pageSize: number;
  @Input() pageNumber: number;
  @Input() isLoading: boolean;

  @Output() setPage = new EventEmitter<any>();
  @Output() selectRow = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.onSetPage({offset: 0, pageSize: this.pageSize });
  }

  onSetPage(event) {
    this.setPage.emit(event);
  }

  onSelectRow(event) {
    this.selectRow.emit(event);
  }
}
