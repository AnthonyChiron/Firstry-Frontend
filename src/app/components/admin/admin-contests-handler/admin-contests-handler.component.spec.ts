import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContestsHandlerComponent } from './admin-contests-handler.component';

describe('AdminContestsHandlerComponent', () => {
  let component: AdminContestsHandlerComponent;
  let fixture: ComponentFixture<AdminContestsHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminContestsHandlerComponent]
    });
    fixture = TestBed.createComponent(AdminContestsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
