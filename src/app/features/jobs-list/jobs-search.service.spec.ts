import { TestBed } from '@angular/core/testing';

import { JobsSearchService } from './jobs-search.service';

describe('JobsSearchService', () => {
  let service: JobsSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
