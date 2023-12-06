import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestRulesFormatFormComponent } from './contest-rules-format-form.component';

describe('ContestRulesFormatFormComponent', () => {
  let component: ContestRulesFormatFormComponent;
  let fixture: ComponentFixture<ContestRulesFormatFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestRulesFormatFormComponent]
    });
    fixture = TestBed.createComponent(ContestRulesFormatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
