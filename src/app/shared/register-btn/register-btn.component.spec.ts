import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBtnComponent } from './register-btn.component';

describe('RegisterBtnComponent', () => {
  let component: RegisterBtnComponent;
  let fixture: ComponentFixture<RegisterBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBtnComponent]
    });
    fixture = TestBed.createComponent(RegisterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
