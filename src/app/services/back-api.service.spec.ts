import { TestBed } from '@angular/core/testing';

import { BackApiService } from './back-api.service';

describe('BackApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackApiService = TestBed.get(BackApiService);
    expect(service).toBeTruthy();
  });
});
