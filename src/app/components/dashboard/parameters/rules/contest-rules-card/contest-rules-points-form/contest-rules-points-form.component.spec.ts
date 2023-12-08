import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestRulesPointsFormComponent } from './contest-rules-points-form.component';

describe('ContestRulesPointsFormComponent', () => {
  let component: ContestRulesPointsFormComponent;
  let fixture: ComponentFixture<ContestRulesPointsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestRulesPointsFormComponent]
    });
    fixture = TestBed.createComponent(ContestRulesPointsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
