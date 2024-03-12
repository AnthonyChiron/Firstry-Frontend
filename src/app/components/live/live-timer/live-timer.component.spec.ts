import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTimerComponent } from './live-timer.component';

describe('LiveTimerComponent', () => {
  let component: LiveTimerComponent;
  let fixture: ComponentFixture<LiveTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveTimerComponent]
    });
    fixture = TestBed.createComponent(LiveTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
