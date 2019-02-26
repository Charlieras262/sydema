import { TestBed, async, inject } from '@angular/core/testing';

import { UserStudentGuard } from './user-student.guard';

describe('UserStudentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStudentGuard]
    });
  });

  it('should ...', inject([UserStudentGuard], (guard: UserStudentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
