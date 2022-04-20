import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardrequestComponent } from './cardrequest.component';

describe('CardrequestComponent', () => {
  let component: CardrequestComponent;
  let fixture: ComponentFixture<CardrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
