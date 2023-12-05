import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestListRulesCardComponent } from './contest-list-rules-card.component';

describe('ContestListRulesCardComponent', () => {
  let component: ContestListRulesCardComponent;
  let fixture: ComponentFixture<ContestListRulesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestListRulesCardComponent]
    });
    fixture = TestBed.createComponent(ContestListRulesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
