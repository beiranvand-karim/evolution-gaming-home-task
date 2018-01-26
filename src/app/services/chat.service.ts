import { Injectable } from '@angular/core';
import {WebSocketService} from './web-socket.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Table} from '../classes/table';
import {DeleteCandidateTable} from '../classes/delete-candidate-table';
import {Router} from '@angular/router';

const URL = 'wss://js-assignment.evolutiongaming.com/ws_api';

@Injectable()
export class ChatService {

  public static TABLE_LIST = 'table_list';
  public static TABLE_ADDED = 'table_added';
  public static TABLE_REMOVED = 'table_removed';
  public static TABLE_UPDATED = 'table_updated';
  public static REMOVAL_FAILED = 'removal_failed';
  public static LOGIN_SUCCESSFUL = 'login_successful';

  private tables = new BehaviorSubject<Table[]>([]);
  public tables$ = this.tables.asObservable();

  private removalCandidatesSubject = new BehaviorSubject<DeleteCandidateTable[]>([]);

  public messages: Subject<any>;

  constructor(
    wsService: WebSocketService,
    router: Router
  ) {

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
            this.removeFromRemovalCandidates(data.id);
            break;

          case ChatService.TABLE_UPDATED:

            this.tableUpdate(data.table);
            break;

          case ChatService.REMOVAL_FAILED:

            this.removalFailed(data.id);
            break;

          case ChatService.LOGIN_SUCCESSFUL:

            router.navigate(['/list']).then(null);
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

  removeFromTableList(id: number) {
    const index = this.tables.getValue().findIndex(tables => tables.id === id);
    this.tables.getValue().splice(index, 1);

  }

  tableUpdate(table: Table) {

    const t = this.tables.getValue().find(tables => tables.id === table.id);
    const s = this.tables.getValue().findIndex(tables => tables.id === table.id);

    t.name = table.name;
    t.participants = table.participants;
    this.tables.getValue()[s] = table;

  }

  addToRemovalCandidates(id: number) {


    const t = this.tables.getValue().find(tables => tables.id === id);
    const i = this.tables.getValue().findIndex(tables => tables.id === id);

    const removalCandidate = new DeleteCandidateTable();
    removalCandidate.id = id;
    removalCandidate.position = i;
    removalCandidate.table = t;


    this.removalCandidatesSubject.getValue().push(removalCandidate);

  }

  removeFromRemovalCandidates(id: number) {
    const i = this.removalCandidatesSubject.getValue().findIndex(tables => tables.id === id);
    this.removalCandidatesSubject.getValue().splice(i, 1);
  }

  removalFailed(id: number) {

    const table = this.removalCandidatesSubject.getValue().find(tables => tables.id === id);
    this.tables.getValue()[table.position] = table.table;


  }
}
