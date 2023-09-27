import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIconBtnComponent } from './nav-icon-btn.component';

describe('IconBtnComponent', () => {
  let component: NavIconBtnComponent;
  let fixture: ComponentFixture<NavIconBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavIconBtnComponent],
    });
    fixture = TestBed.createComponent(NavIconBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
