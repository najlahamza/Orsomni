import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCardsComponent } from './art-cards.component';

describe('ArtCardsComponent', () => {
  let component: ArtCardsComponent;
  let fixture: ComponentFixture<ArtCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
