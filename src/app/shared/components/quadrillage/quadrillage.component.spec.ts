import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrillageComponent } from './quadrillage.component';

describe('QuadrillageComponent', () => {
  let component: QuadrillageComponent;
  let fixture: ComponentFixture<QuadrillageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuadrillageComponent]
    });
    fixture = TestBed.createComponent(QuadrillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
