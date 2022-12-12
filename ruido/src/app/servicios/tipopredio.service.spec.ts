import { TestBed } from '@angular/core/testing';

import { TipopredioService } from './tipopredio.service';

describe('TipopredioService', () => {
  let service: TipopredioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipopredioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
