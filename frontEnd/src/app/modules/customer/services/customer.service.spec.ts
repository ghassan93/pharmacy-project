import { TestBed } from '@angular/core/testing';

import { CustomerOrderService } from './customer.service';

describe('CustomerOrderService', () => {
  let service: CustomerOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
