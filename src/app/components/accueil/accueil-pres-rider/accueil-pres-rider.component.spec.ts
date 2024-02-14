import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilPresRiderComponent } from './accueil-pres-rider.component';

describe('AccueilPresRiderComponent', () => {
  let component: AccueilPresRiderComponent;
  let fixture: ComponentFixture<AccueilPresRiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilPresRiderComponent]
    });
    fixture = TestBed.createComponent(AccueilPresRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
