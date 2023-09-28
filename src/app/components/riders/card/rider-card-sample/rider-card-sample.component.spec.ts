import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCardSampleComponent } from './rider-card-sample.component';

describe('RiderCardComponent', () => {
  let component: RiderCardSampleComponent;
  let fixture: ComponentFixture<RiderCardSampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderCardSampleComponent],
    });
    fixture = TestBed.createComponent(RiderCardSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
