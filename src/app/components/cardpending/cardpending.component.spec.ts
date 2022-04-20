import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpendingComponent } from './cardpending.component';

describe('CardpendingComponent', () => {
  let component: CardpendingComponent;
  let fixture: ComponentFixture<CardpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
