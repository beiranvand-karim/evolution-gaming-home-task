import { TestBed, inject } from '@angular/core/testing';

import { UserInterfaceService } from './user-interface.service';

describe('UserInterfaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInterfaceService]
    });
  });

  it('should be created', inject([UserInterfaceService], (service: UserInterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
