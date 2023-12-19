import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSocialsFormComponent } from './rider-socials-form.component';

describe('RiderSocialsFormComponent', () => {
  let component: RiderSocialsFormComponent;
  let fixture: ComponentFixture<RiderSocialsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderSocialsFormComponent]
    });
    fixture = TestBed.createComponent(RiderSocialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
