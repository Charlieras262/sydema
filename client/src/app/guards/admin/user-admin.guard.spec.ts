import { TestBed, async, inject } from '@angular/core/testing';

import { UserAdminGuard } from './user-admin.guard';

describe('UserAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAdminGuard]
    });
  });

  it('should ...', inject([UserAdminGuard], (guard: UserAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
