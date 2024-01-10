import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerZoneComponent } from './danger-zone.component';

describe('DangerZoneComponent', () => {
  let component: DangerZoneComponent;
  let fixture: ComponentFixture<DangerZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangerZoneComponent]
    });
    fixture = TestBed.createComponent(DangerZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
