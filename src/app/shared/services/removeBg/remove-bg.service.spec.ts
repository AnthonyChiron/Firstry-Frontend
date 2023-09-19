import { TestBed } from '@angular/core/testing';

import { RemoveBgService } from './remove-bg.service';

describe('RemoveBgService', () => {
  let service: RemoveBgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveBgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
