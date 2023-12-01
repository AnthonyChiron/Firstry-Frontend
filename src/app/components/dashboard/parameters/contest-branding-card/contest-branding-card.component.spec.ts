import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestBrandingCardComponent } from './contest-branding-card.component';

describe('ContestBrandingCardComponent', () => {
  let component: ContestBrandingCardComponent;
  let fixture: ComponentFixture<ContestBrandingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestBrandingCardComponent]
    });
    fixture = TestBed.createComponent(ContestBrandingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
