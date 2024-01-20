import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCardMediumComponent } from './rider-card-md.component';

describe('RiderCardComponent', () => {
  let component: RiderCardMediumComponent;
  let fixture: ComponentFixture<RiderCardMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiderCardMediumComponent],
    });
    fixture = TestBed.createComponent(RiderCardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
