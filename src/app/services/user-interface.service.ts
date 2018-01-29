import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserInterfaceService {


  private dropDownSubject = new BehaviorSubject<boolean>(false);
  public dropDown$ = this.dropDownSubject.asObservable();


  private slideSubject = new BehaviorSubject<boolean>(false);
  public slide$ = this.slideSubject.asObservable();


  private updateSlideSubject = new BehaviorSubject<boolean>(false);
  public updateSlide$ = this.updateSlideSubject.asObservable();

  private updateIdSubject = new BehaviorSubject<number>(null);
  public updateId$ = this.updateIdSubject.asObservable();

  constructor() { }

  toggleSlideUpdate() {
    this.updateSlideSubject.next(!this.updateSlideSubject.getValue());
  }


  setUpdateId(value: number) {
    this.updateIdSubject.next(value);
  }

  getUpdateId() {
    return this.updateIdSubject.getValue();
  }

  slideUpdateIn() {
    this.updateSlideSubject.next(true);
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

  showDropDown() {
    this.dropDownSubject.next(true);
  }

  hideDropDown() {
    this.dropDownSubject.next(false);
  }

}
