import { TestBed, async, inject } from '@angular/core/testing';

import { UserTeacherGuard } from './user-teacher.guard';

describe('UserTeacherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTeacherGuard]
    });
  });

  it('should ...', inject([UserTeacherGuard], (guard: UserTeacherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
