import { TestBed } from '@angular/core/testing';

import { IsOrganizerGuard } from './is-organizer-guard.service';

describe('AuthGuardService', () => {
  let service: IsOrganizerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsOrganizerGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
