import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRiderFormComponent } from './signup-rider-form.component';

describe('SignupRiderFormComponent', () => {
  let component: SignupRiderFormComponent;
  let fixture: ComponentFixture<SignupRiderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupRiderFormComponent]
    });
    fixture = TestBed.createComponent(SignupRiderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
