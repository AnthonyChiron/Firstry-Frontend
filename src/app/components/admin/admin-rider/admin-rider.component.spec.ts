import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRiderComponent } from './admin-rider.component';

describe('AdminRiderComponent', () => {
  let component: AdminRiderComponent;
  let fixture: ComponentFixture<AdminRiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRiderComponent]
    });
    fixture = TestBed.createComponent(AdminRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
