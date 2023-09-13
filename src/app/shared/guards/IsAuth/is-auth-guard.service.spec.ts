import { TestBed } from '@angular/core/testing';

import { IsAuthGuard } from './is-auth-guard.service';

describe('AuthGuardService', () => {
  let service: IsAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
