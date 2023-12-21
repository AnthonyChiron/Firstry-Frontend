import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPlanningComponent } from './contest-planning.component';

describe('ContestPlanningComponent', () => {
  let component: ContestPlanningComponent;
  let fixture: ComponentFixture<ContestPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestPlanningComponent]
    });
    fixture = TestBed.createComponent(ContestPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
