import { TestBed } from '@angular/core/testing';

import { AttNomeRefService } from './att-nome-ref.service';

describe('AttNomeRefService', () => {
  let service: AttNomeRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttNomeRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
