import { Injectable } from '@angular/core';
import {WebSocketService} from './web-socket.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Table} from '../classes/table';

const URL = 'wss://js-assignment.evolutiongaming.com/ws_api';



@Injectable()
export class ChatService {


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


          case 'table_list':

            this.tables.next(data.tables);

            break;


          case 'table_added':


            const newTable = data.table;

            if (data.after_id === -1) {
              this.tables.getValue()[0] = newTable;
            } else {

              const k = this.tables.getValue().findIndex(tables => tables.id === data.after_id);
              this.tables.getValue()[k + 1] = newTable;
            }


            break;

          case 'table_removed':

            const index = this.tables.getValue().findIndex(tables => tables.id === data.id);

            if (index !== -1 ) {
              this.tables.getValue().splice(index, 1);
              this.tables.next(this.tables.getValue());
            }

            break;

          case 'table_updated':


            const table = this.tables.getValue().find(tables => tables.id === data.table.id);
            const s = this.tables.getValue().findIndex(tables => tables.id === data.table.id);

            table.name = data.table.name;
            table.participants = data.table.participants;
            this.tables.getValue()[s] = table;


            break;

          case 'removal_failed':

            const i = this.removedTablesSubject.getValue().findIndex(tables => tables.id === data.id);

            if (i !== -1 ) {
              this.tables.getValue().push(this.removedTablesSubject.getValue().splice(i, 1)[0]);
            }

            break;

          default:
            break;

        }



          return data.$type;
      });

  }


  removeTable(id: number) {

    const index = this.tables.getValue().findIndex(tables => tables.id === id);

    this.removedTablesSubject.next(this.tables.getValue().splice(index, 1));
    this.tables.next(this.tables.getValue());


  }

}
