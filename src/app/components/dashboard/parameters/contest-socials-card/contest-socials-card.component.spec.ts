import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestSocialsCardComponent } from './contest-socials-card.component';

describe('ContestSocialsCardComponent', () => {
  let component: ContestSocialsCardComponent;
  let fixture: ComponentFixture<ContestSocialsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestSocialsCardComponent]
    });
    fixture = TestBed.createComponent(ContestSocialsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
