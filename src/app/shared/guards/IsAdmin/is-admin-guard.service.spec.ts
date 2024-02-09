import { TestBed } from '@angular/core/testing';

import { IsAdminGuard } from './is-admin-guard.service';

describe('AuthGuardService', () => {
  let service: IsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAdminGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
