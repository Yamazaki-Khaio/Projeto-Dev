import { TestBed } from '@angular/core/testing';

import { NomeRefService } from './att-nome-ref.service';

describe('AttNomeRefService', () => {
  let service: NomeRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomeRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
