import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingTextComponent } from './scrolling-text.component';

describe('ScollingTextComponent', () => {
  let component: ScrollingTextComponent;
  let fixture: ComponentFixture<ScrollingTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollingTextComponent],
    });
    fixture = TestBed.createComponent(ScrollingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
