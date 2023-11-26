import { TestBed } from '@angular/core/testing';

import { ErroMessageService } from './erro-message.service';

describe('ErroMessageService', () => {
  let service: ErroMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
