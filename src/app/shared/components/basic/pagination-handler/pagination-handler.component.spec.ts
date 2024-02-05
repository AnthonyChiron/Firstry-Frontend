import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationHandlerComponent } from './pagination-handler.component';

describe('PaginationHandlerComponent', () => {
  let component: PaginationHandlerComponent;
  let fixture: ComponentFixture<PaginationHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationHandlerComponent]
    });
    fixture = TestBed.createComponent(PaginationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
