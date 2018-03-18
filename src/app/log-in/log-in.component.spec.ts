import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChatServiceStub} from '../add/add.component.spec';
import {ChatService} from '../services/chat.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ LogInComponent ],
      providers: [
        {
          provide: ChatService, useClass: ChatServiceStub
        }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test login()', () => {

    const service = TestBed.get(ChatService);

    component.logInForm.controls.username.setValue('test');
    component.logInForm.controls.password.setValue('test');


    component.login();

    expect(service.messages.getValue().username).toBe('test');
    expect(service.messages.getValue().password).toBe('test');

  });

  it('should test subscribe()', () => {
    const service = TestBed.get(ChatService);

    component.subscribe();

    expect(service.messages.getValue().$type).toBe('subscribe_tables');
  });
});
