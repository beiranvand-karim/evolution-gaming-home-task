import { TestBed, inject } from '@angular/core/testing';

import { WebSocketService } from './web-socket.service';

describe('WebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketService]
    });
  });

  it('should be created', inject([WebSocketService], (service: WebSocketService) => {
    expect(service).toBeTruthy();
  }));

  it('should test connect()', inject([WebSocketService], (service: WebSocketService) => {

    expect(service.connect('wss://js-assignment.evolutiongaming.com/ws_api')).toBe(service._get_subject);

  }));

  it('should test create()', inject([WebSocketService], (service: WebSocketService) => {

    expect(service.connect('wss://js-assignment.evolutiongaming.com/ws_api')).toBe(service._get_subject);

  }));
});
