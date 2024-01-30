import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestStateComponent } from './contest-state.component';

describe('ContestStateComponent', () => {
  let component: ContestStateComponent;
  let fixture: ComponentFixture<ContestStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestStateComponent]
    });
    fixture = TestBed.createComponent(ContestStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
