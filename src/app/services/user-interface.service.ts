import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserInterfaceService {


  private dropDownSubject = new BehaviorSubject<boolean>(false);
  public dropDown$ = this.dropDownSubject.asObservable();


  constructor() { }


  showDropDown() {
    this.dropDownSubject.next(true);
  }

  hideDropDown() {
    this.dropDownSubject.next(false);
  }

}
