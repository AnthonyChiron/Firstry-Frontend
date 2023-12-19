import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderInfoFormComponent } from './rider-info-form.component';

describe('RiderInfoFormComponent', () => {
  let component: RiderInfoFormComponent;
  let fixture: ComponentFixture<RiderInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderInfoFormComponent]
    });
    fixture = TestBed.createComponent(RiderInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
