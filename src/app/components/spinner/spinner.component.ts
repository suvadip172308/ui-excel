import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  color = 'warn';
  mode = 'indeterminate';
  value = 50;
  strokeWidth = 4;

  constructor() { }

  ngOnInit() {
  }

}
