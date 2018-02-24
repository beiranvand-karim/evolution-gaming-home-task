import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemComponent } from './table-item.component';
import {UpdateComponent} from '../update/update.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChatService} from '../services/chat.service';
import {WebSocketService} from '../services/web-socket.service';
import { RouterTestingModule } from '@angular/router/testing';
import {UserInterfaceService} from '../services/user-interface.service';
import {HttpModule} from '@angular/http';
import {Table} from '../classes/table';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TableItemComponent', () => {
  let component: TableItemComponent;
  let fixture: ComponentFixture<TableItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TableItemComponent,
        UpdateComponent
      ],
      providers: [
        ChatService,
        WebSocketService,
        UserInterfaceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {

    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    component.table = t;

    expect(component).toBeTruthy();
  });

  it('should toggle visible on edit button click', () => {

    component.visible = false;

    component.showUpdate();

    expect(component.visible).toBeTruthy();


  });

  it('should update template with values of input table', () => {


    const t = new Table();

    t.id = 1;
    t.name = 'test';
    t.participants = 5;

    component.table = t;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.name')).nativeElement.innerText).toContain('test');
    expect(fixture.debugElement.query(By.css('.participants')).nativeElement.innerText).toContain('5');
    expect(fixture.debugElement.query(By.css('.id')).nativeElement.innerText).toContain('1');


  });
});
