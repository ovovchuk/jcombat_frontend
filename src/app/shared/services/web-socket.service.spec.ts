/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebsocketService } from './web-socket.service';

describe('WebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService]
    });
  });

  it('should ...', inject([WebsocketService], (service: WebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
