import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCardLargeComponent } from './rider-card-large.component';

describe('RiderCardLargeComponent', () => {
  let component: RiderCardLargeComponent;
  let fixture: ComponentFixture<RiderCardLargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderCardLargeComponent]
    });
    fixture = TestBed.createComponent(RiderCardLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
