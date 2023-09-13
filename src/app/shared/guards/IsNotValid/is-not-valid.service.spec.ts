import { TestBed } from '@angular/core/testing';

import { IsNotValidGuard } from './is-not-valid.service';

describe('IsNotValidGuard', () => {
  let service: IsNotValidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsNotValidGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
