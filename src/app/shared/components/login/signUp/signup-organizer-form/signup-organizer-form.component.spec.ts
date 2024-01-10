import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOrganizerFormComponent } from './signup-organizer-form.component';

describe('SignupContestFormComponent', () => {
  let component: SignupOrganizerFormComponent;
  let fixture: ComponentFixture<SignupOrganizerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupOrganizerFormComponent],
    });
    fixture = TestBed.createComponent(SignupOrganizerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
