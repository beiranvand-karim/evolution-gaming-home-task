import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UserInterfaceService} from '../services/user-interface.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChatService} from '../services/chat.service';
import {WebSocketService} from '../services/web-socket.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export class UserInterfaceServiceStub {

  private slideSubject = new BehaviorSubject<boolean>(false);
  public slide$ = this.slideSubject.asObservable();


  private updateSlideSubject = new BehaviorSubject<boolean>(false);
  public updateSlide$ = this.updateSlideSubject.asObservable();



  constructor() { }

  toggleSlideUpdate() {
    this.updateSlideSubject.next(!this.updateSlideSubject.getValue());
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


}

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        ChatService,
        WebSocketService,
        {
          provide: UserInterfaceService, useClass: UserInterfaceServiceStub
        }
      ],
      declarations: [ AddComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should slide in or out the add form on clicking the close button', () => {


    const service = TestBed.get(UserInterfaceService);

    const spy = spyOn(service, 'slideOut');

    component.close();

    service.slide$.subscribe((data) => {

      expect(data).toBeFalsy();

    });


  });



});
