import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserInterfaceService {



  private slideSubject = new BehaviorSubject<boolean>(false);
  public slide$ = this.slideSubject.asObservable();


  private updateSlideSubject = new BehaviorSubject<boolean>(false);
  public updateSlide$ = this.updateSlideSubject.asObservable();


  toggleSlideUpdate() {
    this.updateSlideSubject.next(!this.updateSlideSubject.getValue());
  }


  slideUpdateIn() {
    this.updateSlideSubject.next(true);
  }

  slideUpdateOut() {
    this.updateSlideSubject.next(false);
  }

  slideIn() {
    this.slideSubject.next(true);
  }

  slideOut() {
    this.slideSubject.next(false);
  }

}
