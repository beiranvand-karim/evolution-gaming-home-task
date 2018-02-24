import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComponent } from './update.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UserInterfaceService} from '../services/user-interface.service';
import {ChatService} from '../services/chat.service';
import {WebSocketService} from '../services/web-socket.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Table} from '../classes/table';
import {UserInterfaceServiceStub} from '../add/add.component.spec';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

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
      declarations: [ UpdateComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    component.table = t;


    const spy = spyOn(component, 'ngOnInit').and.callFake(() => {
      component.edit_Form.patchValue({
        edit_name: 'test',
        edit_participants: 'test'
      });
    });

    fixture.detectChanges();


    expect(component).toBeTruthy();
  });

  it('should update form in ngOnInit method', () => {

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    component.table = t;

    const spy = spyOn(component, 'ngOnInit').and.callFake(() => {
      component.edit_Form.patchValue({
        edit_name: 'test',
        edit_participants: 'test'
      });
    });

    fixture.detectChanges();

    component.ngOnInit();

    expect(component.edit_Form.controls['edit_name'].value).toBe('test');
    expect(component.edit_Form.controls['edit_participants'].value).toBe('test');

  });

  it('should close the update form on close()', () => {


    const service = TestBed.get(UserInterfaceService);

    component.close();

    service.updateSlide$.subscribe((data) => {

      expect(data).toBeFalsy();

    });

  });
});
