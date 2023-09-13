import { TestBed } from '@angular/core/testing';

import { IsNotAuthService } from './is-not-auth.service';

describe('IsNotAuthService', () => {
  let service: IsNotAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsNotAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
