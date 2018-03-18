import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import {ChatService} from '../services/chat.service';
import {AddComponent} from '../add/add.component';
import {TablesListComponent} from '../tables-list/tables-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TableItemComponent} from '../table-item/table-item.component';
import {UpdateComponent} from '../update/update.component';
import {ChatServiceStub} from '../add/add.component.spec';
import {UserInterfaceService} from '../services/user-interface.service';
import {Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


export class RouterStub {


  navigate(params) {

  }

}


describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ContainerComponent,
        AddComponent,
        TablesListComponent,
        TableItemComponent,
        UpdateComponent
      ],
      providers: [
        {
          provide: ChatService, useClass: ChatServiceStub
        },
        UserInterfaceService,
        {
          provide: Router, useClass: RouterStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test unsubscribe()', () => {
    const service = TestBed.get(ChatService);

    component.unsubscribe();

    expect(service.messages.getValue().$type).toBe('unsubscribe_tables');
  });



  it('should test toggleSlide()', () => {

    component.slide = true;

    component.toggleSlide();

    expect(component.slide).toBeFalsy();

  });

  it('should test change()', () => {

    component.slide = true;

    component.change();

    expect(component.change()).toBe('in');

    component.slide = false;

    component.change();

    expect(component.change()).toBe('out');

  });

  it('should test logOut()', () => {

    const service = TestBed.get(ChatService);
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.logOut();

    expect(service.messages.getValue().$type).toBe('logout');
    expect(spy).toHaveBeenCalledWith(['/']);


  });


});
