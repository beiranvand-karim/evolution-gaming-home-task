import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesListComponent } from './tables-list.component';
import {TableItemComponent} from '../table-item/table-item.component';
import {UpdateComponent} from '../update/update.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('TablesListComponent', () => {
  let component: TablesListComponent;
  let fixture: ComponentFixture<TablesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TablesListComponent,
        TableItemComponent,
        UpdateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
