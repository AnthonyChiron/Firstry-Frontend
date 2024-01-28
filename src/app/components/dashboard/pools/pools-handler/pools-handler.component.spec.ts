import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsHandlerComponent } from './pools-handler.component';

describe('PoolsHandlerComponent', () => {
  let component: PoolsHandlerComponent;
  let fixture: ComponentFixture<PoolsHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoolsHandlerComponent]
    });
    fixture = TestBed.createComponent(PoolsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
