import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRegistrationsComponent } from './overview-registrations.component';

describe('OverviewRegistrationsComponent', () => {
  let component: OverviewRegistrationsComponent;
  let fixture: ComponentFixture<OverviewRegistrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewRegistrationsComponent]
    });
    fixture = TestBed.createComponent(OverviewRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
