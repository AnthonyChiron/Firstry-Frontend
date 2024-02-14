import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilPresContestComponent } from './accueil-pres-contest.component';

describe('AccueilPresContestComponent', () => {
  let component: AccueilPresContestComponent;
  let fixture: ComponentFixture<AccueilPresContestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilPresContestComponent]
    });
    fixture = TestBed.createComponent(AccueilPresContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
