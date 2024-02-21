import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsTableComponent } from './registrations-table.component';

describe('RegistrationsTableComponent', () => {
  let component: RegistrationsTableComponent;
  let fixture: ComponentFixture<RegistrationsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationsTableComponent]
    });
    fixture = TestBed.createComponent(RegistrationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
