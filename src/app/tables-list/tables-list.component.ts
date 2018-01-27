import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../classes/table';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'max-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent implements OnInit {


  @Input() tables: Table[];

  constructor() { }

  ngOnInit() {
  }




}
