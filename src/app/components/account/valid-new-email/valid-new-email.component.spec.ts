import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidNewEmailComponent } from './valid-new-email.component';

describe('ValidNewEmailComponent', () => {
  let component: ValidNewEmailComponent;
  let fixture: ComponentFixture<ValidNewEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidNewEmailComponent]
    });
    fixture = TestBed.createComponent(ValidNewEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
