import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidNewPasswordComponent } from './valid-new-password.component';

describe('ValidNewPasswordComponent', () => {
  let component: ValidNewPasswordComponent;
  let fixture: ComponentFixture<ValidNewPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidNewPasswordComponent]
    });
    fixture = TestBed.createComponent(ValidNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
