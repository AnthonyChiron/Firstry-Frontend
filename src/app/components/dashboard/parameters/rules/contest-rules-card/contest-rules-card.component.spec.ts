import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestRulesCardComponent } from './contest-rules-card.component';

describe('ContestRulesCardComponent', () => {
  let component: ContestRulesCardComponent;
  let fixture: ComponentFixture<ContestRulesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestRulesCardComponent]
    });
    fixture = TestBed.createComponent(ContestRulesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
