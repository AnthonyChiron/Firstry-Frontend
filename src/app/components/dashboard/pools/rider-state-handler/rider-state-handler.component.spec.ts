import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderStateHandlerComponent } from './rider-state-handler.component';

describe('RiderStateHandlerComponent', () => {
  let component: RiderStateHandlerComponent;
  let fixture: ComponentFixture<RiderStateHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderStateHandlerComponent]
    });
    fixture = TestBed.createComponent(RiderStateHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
