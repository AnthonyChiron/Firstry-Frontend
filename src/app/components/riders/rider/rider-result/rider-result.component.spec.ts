import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderResultComponent } from './rider-result.component';

describe('RiderResultComponent', () => {
  let component: RiderResultComponent;
  let fixture: ComponentFixture<RiderResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderResultComponent]
    });
    fixture = TestBed.createComponent(RiderResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
