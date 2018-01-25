import { Injectable } from '@angular/core';
import {WebSocketService} from './web-socket.service';
import {Subject} from 'rxjs/Subject';

const URL = 'ws://localhost:8080/karim';



@Injectable()
export class ChatService {


  public messages: Subject<string>;

  constructor(wsService: WebSocketService) {

    this.messages = <Subject<string>> wsService
      .connect(URL)
      .map((response: MessageEvent): string => {
          return response.data;
      });

  }

}
