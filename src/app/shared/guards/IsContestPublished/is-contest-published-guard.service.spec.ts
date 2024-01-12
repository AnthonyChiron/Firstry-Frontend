import { TestBed } from '@angular/core/testing';

import { IsContestPublishedGuard } from './is-contest-published-guard.service';

describe('AuthGuardService', () => {
  let service: IsContestPublishedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsContestPublishedGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
