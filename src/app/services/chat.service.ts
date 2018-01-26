import { Injectable } from '@angular/core';
import {WebSocketService} from './web-socket.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Table} from '../classes/table';

const URL = 'wss://js-assignment.evolutiongaming.com/ws_api';

@Injectable()
export class ChatService {

  public static TABLE_LIST = 'table_list';
  public static TABLE_ADDED = 'table_added';
  public static TABLE_REMOVED = 'table_removed';
  public static TABLE_UPDATED = 'table_updated';
  public static REMOVAL_FAILED = 'removal_failed';

  private tables = new BehaviorSubject<Table[]>([]);
  public tables$ = this.tables.asObservable();

  private removedTablesSubject = new BehaviorSubject<Table[]>(null);


  public messages: Subject<any>;

  constructor(wsService: WebSocketService) {

    this.messages = <Subject<any>> wsService
      .connect(URL)
      .map((response: MessageEvent): any => {

        console.log(JSON.parse(response.data));

        const data = JSON.parse(response.data);



        switch (data.$type) {


          case ChatService.TABLE_LIST:

            this.tableList(data.tables);
            break;


          case ChatService.TABLE_ADDED:

            this.tableAdded(data.table, data.after_id);
            break;

          case ChatService.TABLE_REMOVED:

            this.tableRemoved(data.id);
            break;

          case ChatService.TABLE_UPDATED:

            this.tableUpdate(data.table);
            break;

          case ChatService.REMOVAL_FAILED:

            // const i = this.removedTablesSubject.getValue().findIndex(tables => tables.id === data.id);
            //
            // if (i !== -1 ) {
            //   this.tables.getValue().push(this.removedTablesSubject.getValue().splice(i, 1)[0]);
            // }

            break;

          default:
            break;

        }



          return data.$type;
      });

  }

  tableList(tables: Table[]) {

    this.tables.next(tables);

  }

  tableAdded(table: Table, afterId: number) {

    if (afterId === -1) {
      this.tables.getValue()[0] = table;
    } else {

      const k = this.tables.getValue().findIndex(tables => tables.id === afterId);
      this.tables.getValue()[k + 1] = table;
    }

  }

  tableRemoved(id: number) {

    const index = this.tables.getValue().findIndex(tables => tables.id === id);

    if (index !== -1 ) {
      this.tables.getValue().splice(index, 1);
    }

  }

  tableUpdate(table: Table) {

    const t = this.tables.getValue().find(tables => tables.id === table.id);
    const s = this.tables.getValue().findIndex(tables => tables.id === table.id);

    t.name = table.name;
    t.participants = table.participants;
    this.tables.getValue()[s] = table;

  }


  removeTable(id: number) {

    const index = this.tables.getValue().findIndex(tables => tables.id === id);

    this.removedTablesSubject.next(this.tables.getValue().splice(index, 1));
    this.tables.next(this.tables.getValue());

  }

}
