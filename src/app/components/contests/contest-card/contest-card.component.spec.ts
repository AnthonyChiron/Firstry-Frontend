import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestCardComponent } from './contest-card.component';

describe('ContestCardComponent', () => {
  let component: ContestCardComponent;
  let fixture: ComponentFixture<ContestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestCardComponent]
    });
    fixture = TestBed.createComponent(ContestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
