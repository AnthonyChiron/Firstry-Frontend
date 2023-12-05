import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestRulesFormatInputComponent } from './contest-rules-format-input.component';

describe('ContestRulesFormatSelectComponent', () => {
  let component: ContestRulesFormatInputComponent;
  let fixture: ComponentFixture<ContestRulesFormatInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestRulesFormatInputComponent],
    });
    fixture = TestBed.createComponent(ContestRulesFormatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
