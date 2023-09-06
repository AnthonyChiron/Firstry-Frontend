import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCardComponent } from './rider-card.component';

describe('RiderCardComponent', () => {
  let component: RiderCardComponent;
  let fixture: ComponentFixture<RiderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderCardComponent]
    });
    fixture = TestBed.createComponent(RiderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
