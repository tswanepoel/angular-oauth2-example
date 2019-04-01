import { TestBed } from '@angular/core/testing';

import { GraphApiService } from './graph-api.service';

describe('GraphApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphApiService = TestBed.get(GraphApiService);
    expect(service).toBeTruthy();
  });
});
