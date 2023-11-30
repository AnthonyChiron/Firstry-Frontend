import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideInputComponent } from './slide-input.component';

describe('SlideInputComponent', () => {
  let component: SlideInputComponent;
  let fixture: ComponentFixture<SlideInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideInputComponent]
    });
    fixture = TestBed.createComponent(SlideInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
