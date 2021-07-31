import { TestBed } from '@angular/core/testing';

import { UserLogoutGuardService } from './user-logout-guard.service';

describe('UserLogoutGuardService', () => {
  let service: UserLogoutGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogoutGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
