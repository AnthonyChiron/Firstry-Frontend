import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTagComponent } from './info-tag.component';

describe('InfoTagComponent', () => {
  let component: InfoTagComponent;
  let fixture: ComponentFixture<InfoTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTagComponent]
    });
    fixture = TestBed.createComponent(InfoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
