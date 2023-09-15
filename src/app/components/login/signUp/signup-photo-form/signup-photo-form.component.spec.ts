import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPhotoFormComponent } from './signup-photo-form.component';

describe('SignupPhotoFormComponent', () => {
  let component: SignupPhotoFormComponent;
  let fixture: ComponentFixture<SignupPhotoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPhotoFormComponent]
    });
    fixture = TestBed.createComponent(SignupPhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
