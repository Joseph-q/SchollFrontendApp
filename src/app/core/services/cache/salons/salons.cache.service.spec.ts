import { TestBed } from '@angular/core/testing';

import { SalonsCacheService } from './salons.cache.service';

describe('SalonsCacheService', () => {
  let service: SalonsCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalonsCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
