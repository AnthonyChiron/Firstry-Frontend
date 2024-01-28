import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsHandlerComponent } from './results-handler.component';

describe('ResultsHandlerComponent', () => {
  let component: ResultsHandlerComponent;
  let fixture: ComponentFixture<ResultsHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsHandlerComponent]
    });
    fixture = TestBed.createComponent(ResultsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
