import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportsHandlerComponent } from './admin-reports-handler.component';

describe('AdminReportsHandlerComponent', () => {
  let component: AdminReportsHandlerComponent;
  let fixture: ComponentFixture<AdminReportsHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportsHandlerComponent]
    });
    fixture = TestBed.createComponent(AdminReportsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
