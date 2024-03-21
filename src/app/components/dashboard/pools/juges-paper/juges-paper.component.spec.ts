import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugesPaperComponent } from './juges-paper.component';

describe('JugesPaperComponent', () => {
  let component: JugesPaperComponent;
  let fixture: ComponentFixture<JugesPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JugesPaperComponent]
    });
    fixture = TestBed.createComponent(JugesPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
