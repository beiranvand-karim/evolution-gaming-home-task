import {Component, Input } from '@angular/core';
import {Table} from '../classes/table';

@Component({
  selector: 'max-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent {

  @Input() tables: Table[];

}
