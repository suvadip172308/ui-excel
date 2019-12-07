import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDetailsComponent } from './retailer-details.component';

describe('RetailerDetailsComponent', () => {
  let component: RetailerDetailsComponent;
  let fixture: ComponentFixture<RetailerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
