import { TestBed } from '@angular/core/testing';

import { AsignationService } from './asignation.service';

describe('AsignationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignationService = TestBed.get(AsignationService);
    expect(service).toBeTruthy();
  });
});
