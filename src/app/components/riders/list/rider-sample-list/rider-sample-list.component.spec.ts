import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSampleListComponent } from './rider-sample-list.component';

describe('RiderSampleListComponent', () => {
  let component: RiderSampleListComponent;
  let fixture: ComponentFixture<RiderSampleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderSampleListComponent]
    });
    fixture = TestBed.createComponent(RiderSampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
