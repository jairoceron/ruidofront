import { TestBed } from '@angular/core/testing';

import { Chart2DgenericoService } from './chart2-dgenerico.service';

describe('Chart2DgenericoService', () => {
  let service: Chart2DgenericoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chart2DgenericoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
