/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SingUpService } from './sing-up.service';

describe('SingUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingUpService]
    });
  });

  it('should ...', inject([SingUpService], (service: SingUpService) => {
    expect(service).toBeTruthy();
  }));
});
