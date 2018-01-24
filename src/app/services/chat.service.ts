import { Injectable } from '@angular/core';
import {WebSocketService} from './web-socket.service';
import {Subject} from 'rxjs/Subject';

const CHAT_URL = 'ws://echo.websocket.org/';
const URL = 'ws://localhost:8080/websocket';


export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {


  public messages: Subject<Message>;

  constructor(wsService: WebSocketService) {

    this.messages = <Subject<Message>> wsService
      .connect(URL)
      .map((response: MessageEvent): Message => {


        const data = JSON.parse(response.data);


        return {
          author: data.author,
          message: data.message
        };
      });

  }

}
