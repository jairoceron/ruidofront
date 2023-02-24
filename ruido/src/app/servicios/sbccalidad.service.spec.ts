import { TestBed } from '@angular/core/testing';

import { SbccalidadService } from './sbccalidad.service';

describe('SbccalidadService', () => {
  let service: SbccalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbccalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
