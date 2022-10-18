import { TestBed } from '@angular/core/testing';

import { RadicadoService } from './radicado.service';

describe('RadicadoService', () => {
  let service: RadicadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadicadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
