import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestParametersDetailComponent } from './contest-parameters-detail.component';

describe('ContestInfosDetailComponent', () => {
  let component: ContestParametersDetailComponent;
  let fixture: ComponentFixture<ContestParametersDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestParametersDetailComponent],
    });
    fixture = TestBed.createComponent(ContestParametersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
