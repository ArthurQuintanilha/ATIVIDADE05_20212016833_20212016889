import { TestBed } from '@angular/core/testing';

import { ArvoreFotoService } from './arvore-foto.service';

describe('ArvoreFotoService', () => {
  let service: ArvoreFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArvoreFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
