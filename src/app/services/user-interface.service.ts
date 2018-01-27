import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserInterfaceService {


  private dropDownSubject = new BehaviorSubject<boolean>(false);
  public dropDown$ = this.dropDownSubject.asObservable();


  private slideSubject = new BehaviorSubject<boolean>(false);
  public slide$ = this.slideSubject.asObservable();


  constructor() { }

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
