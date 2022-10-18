import { TestBed } from '@angular/core/testing';

import { VisitaruidoService } from './visitaruido.service';

describe('VisitaruidoService', () => {
  let service: VisitaruidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitaruidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
