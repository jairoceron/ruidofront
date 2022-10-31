import { TestBed } from '@angular/core/testing';

import { ModulousuarioService } from './modulousuario.service';

describe('ModulousuarioService', () => {
  let service: ModulousuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulousuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
