import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChipsComponent } from './input-chips.component';

describe('InputChipsComponent', () => {
  let component: InputChipsComponent;
  let fixture: ComponentFixture<InputChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputChipsComponent]
    });
    fixture = TestBed.createComponent(InputChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
