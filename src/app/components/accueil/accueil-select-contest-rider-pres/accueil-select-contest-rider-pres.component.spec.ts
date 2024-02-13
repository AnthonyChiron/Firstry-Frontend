import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilSelectContestRiderPresComponent } from './accueil-select-contest-rider-pres.component';

describe('AccueilSelectContestRiderPresComponent', () => {
  let component: AccueilSelectContestRiderPresComponent;
  let fixture: ComponentFixture<AccueilSelectContestRiderPresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilSelectContestRiderPresComponent]
    });
    fixture = TestBed.createComponent(AccueilSelectContestRiderPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
