import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { UserModel } from 'src/app/models/user.model';

describe('CrudService', () => {
  let service: CrudService<UserModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
