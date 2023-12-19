import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderRegistrationsComponent } from './rider-registrations.component';

describe('RiderRegistrationsComponent', () => {
  let component: RiderRegistrationsComponent;
  let fixture: ComponentFixture<RiderRegistrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderRegistrationsComponent]
    });
    fixture = TestBed.createComponent(RiderRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
