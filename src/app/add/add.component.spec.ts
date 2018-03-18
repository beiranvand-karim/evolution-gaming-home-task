import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserInterfaceService} from '../services/user-interface.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChatService} from '../services/chat.service';
import {WebSocketService} from '../services/web-socket.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Table} from '../classes/table';
import {DeleteCandidateTable} from '../classes/delete-candidate-table';


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


export class ChatServiceStub {


  public messages = new BehaviorSubject<any>(null);

  private tables = new BehaviorSubject<Table[]>([]);
  public tables$ = this.tables.asObservable();

  private removalCandidatesSubject = new BehaviorSubject<DeleteCandidateTable[]>([]);



  addToRemovalCandidates(id: number) {


    const t = this.tables.getValue().find(tables => tables.id === id);
    const i = this.tables.getValue().findIndex(tables => tables.id === id);

    const removalCandidate = new DeleteCandidateTable();
    removalCandidate.id = id;
    removalCandidate.position = i;
    removalCandidate.table = t;


    this.removalCandidatesSubject.getValue().push(removalCandidate);

  }

  removeFromTableList(id: number) {
    const index = this.tables.getValue().findIndex(tables => tables.id === id);
    this.tables.getValue().splice(index, 1);

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
        {
          provide: ChatService, useClass: ChatServiceStub
        },
        WebSocketService,
        {
          provide: UserInterfaceService, useClass: UserInterfaceServiceStub
        }
      ],
      declarations: [ AddComponent ]
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



  it('should send a new add request', () => {

    const service = TestBed.get(ChatService);

    component.form.controls.after_id.setValue(1);
    component.form.controls.name.setValue('test');
    component.form.controls.participants.setValue(5);

    const add = {
      '$type': 'add_table',
      'after_id': 1,
      'table': {
        'name': 'test',
        'participants': 5
      }
    };

    component.addTable();

    expect(service.messages.getValue().after_id).toBe(1);
    expect(service.messages.getValue().table.name).toBe('test');
    expect(service.messages.getValue().table.participants).toBe(5);
  });

});
