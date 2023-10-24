import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestInfosDetailComponent } from './contest-infos-detail.component';

describe('ContestInfosDetailComponent', () => {
  let component: ContestInfosDetailComponent;
  let fixture: ComponentFixture<ContestInfosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestInfosDetailComponent]
    });
    fixture = TestBed.createComponent(ContestInfosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
