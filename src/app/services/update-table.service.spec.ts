import { TestBed } from '@angular/core/testing';

import { UpdateTableService } from './update-table.service';

describe('UpdateTableService', () => {
  let service: UpdateTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
