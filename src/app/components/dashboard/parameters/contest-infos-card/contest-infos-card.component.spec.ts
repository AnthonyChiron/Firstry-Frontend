import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestInfosCardComponent } from './contest-infos-card.component';

describe('ContestInfosCardComponent', () => {
  let component: ContestInfosCardComponent;
  let fixture: ComponentFixture<ContestInfosCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestInfosCardComponent]
    });
    fixture = TestBed.createComponent(ContestInfosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
