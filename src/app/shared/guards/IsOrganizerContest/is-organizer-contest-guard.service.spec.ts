import { TestBed } from '@angular/core/testing';

import { IsOrganizerContestGuard } from './is-organizer-contest-guard.service';

describe('AuthGuardService', () => {
  let service: IsOrganizerContestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsOrganizerContestGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
