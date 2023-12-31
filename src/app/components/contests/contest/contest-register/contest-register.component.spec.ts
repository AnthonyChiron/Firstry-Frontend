import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestRegisterComponent } from './contest-register.component';

describe('ContestRegisterComponent', () => {
  let component: ContestRegisterComponent;
  let fixture: ComponentFixture<ContestRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestRegisterComponent]
    });
    fixture = TestBed.createComponent(ContestRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
