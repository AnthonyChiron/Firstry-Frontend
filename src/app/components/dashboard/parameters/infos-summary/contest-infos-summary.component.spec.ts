import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestInfosSummaryComponent } from './contest-infos-summary.component';

describe('ContestInfosSummaryComponent', () => {
  let component: ContestInfosSummaryComponent;
  let fixture: ComponentFixture<ContestInfosSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestInfosSummaryComponent],
    });
    fixture = TestBed.createComponent(ContestInfosSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
