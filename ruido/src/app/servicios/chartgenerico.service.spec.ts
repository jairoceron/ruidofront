import { TestBed } from '@angular/core/testing';

import { ChartgenericoService } from './chartgenerico.service';

describe('ChartgenericoService', () => {
  let service: ChartgenericoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartgenericoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
