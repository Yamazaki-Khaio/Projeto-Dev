import { TestBed } from '@angular/core/testing';

import { EnderecoSharedService } from './endereco-shared.service';

describe('EnderecoSharedService', () => {
  let service: EnderecoSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnderecoSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
