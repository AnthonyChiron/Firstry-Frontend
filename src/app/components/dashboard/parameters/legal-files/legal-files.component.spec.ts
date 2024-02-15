import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalFilesComponent } from './legal-files.component';

describe('LegalFilesComponent', () => {
  let component: LegalFilesComponent;
  let fixture: ComponentFixture<LegalFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalFilesComponent]
    });
    fixture = TestBed.createComponent(LegalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
