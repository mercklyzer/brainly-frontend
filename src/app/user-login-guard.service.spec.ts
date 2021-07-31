import { TestBed } from '@angular/core/testing';

import { UserLoginGuardService } from './user-login-guard.service';

describe('UserLoginGuardService', () => {
  let service: UserLoginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
