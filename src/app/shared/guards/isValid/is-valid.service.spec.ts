import { TestBed } from '@angular/core/testing';

import { IsValidGuard } from './is-valid.service';

describe('IsVerifyService', () => {
  let service: IsValidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsValidGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
