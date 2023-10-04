import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAdressComponent } from './input-adress.component';

describe('InputAdressComponent', () => {
  let component: InputAdressComponent;
  let fixture: ComponentFixture<InputAdressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputAdressComponent]
    });
    fixture = TestBed.createComponent(InputAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
