import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRidersHandlerComponent } from './admin-riders-handler.component';

describe('AdminRidersHandlerComponent', () => {
  let component: AdminRidersHandlerComponent;
  let fixture: ComponentFixture<AdminRidersHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRidersHandlerComponent]
    });
    fixture = TestBed.createComponent(AdminRidersHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
