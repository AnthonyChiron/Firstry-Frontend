import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsCardComponent } from './maps-card.component';

describe('MapsCardComponent', () => {
  let component: MapsCardComponent;
  let fixture: ComponentFixture<MapsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapsCardComponent]
    });
    fixture = TestBed.createComponent(MapsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
