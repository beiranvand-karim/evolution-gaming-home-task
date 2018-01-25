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

            break;

          case 'table_removed':

            break;

          default:
            break;

        }



          return data.$type;
      });

  }

}
