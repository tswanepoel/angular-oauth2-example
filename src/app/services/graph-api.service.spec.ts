import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GraphApiService } from './graph-api.service';

describe('GraphApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ HttpClientModule ]}));

  it('should be created', () => {
    const service: GraphApiService = TestBed.get(GraphApiService);
    expect(service).toBeTruthy();
  });
});
