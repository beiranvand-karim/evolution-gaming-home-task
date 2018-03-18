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

  it('should test slideOut()', inject([UserInterfaceService], (service: UserInterfaceService) => {

    service.slideOut();

    service.slide$.subscribe((data: boolean) => {

      expect(data).toBeFalsy();
    });

  }));

  it('should test slideIn()', inject([UserInterfaceService], (service: UserInterfaceService) => {

    service.slideIn();

    service.slide$.subscribe((data: boolean) => {

      expect(data).toBeTruthy();
    });

  }));

  it('should test slideUpdateIn()', inject([UserInterfaceService], (service: UserInterfaceService) => {

    service.slideUpdateIn();

    service.updateSlide$.subscribe((data: boolean) => {

      expect(data).toBeTruthy();
    });

  }));

  it('should test slideUpdateOut()', inject([UserInterfaceService], (service: UserInterfaceService) => {

    service.slideUpdateOut();

    service.updateSlide$.subscribe((data: boolean) => {

      expect(data).toBeFalsy();
    });

  }));

  it('should test toggleSlideUpdate()', inject([UserInterfaceService], (service: UserInterfaceService) => {
    service.slideUpdateIn();
    service.toggleSlideUpdate();

    service.updateSlide$.subscribe((data: boolean) => {

      expect(data).toBeFalsy();
    });

  }));
});
