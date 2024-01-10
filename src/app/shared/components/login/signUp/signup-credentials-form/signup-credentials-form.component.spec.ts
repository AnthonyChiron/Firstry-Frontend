import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCredentialsFormComponent } from './signup-credentials-form.component';

describe('SignupCredentialsFormComponent', () => {
  let component: SignupCredentialsFormComponent;
  let fixture: ComponentFixture<SignupCredentialsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCredentialsFormComponent]
    });
    fixture = TestBed.createComponent(SignupCredentialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
