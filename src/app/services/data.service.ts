import { Injectable } from '@angular/core';


const CHAT_URL = 'ws://echo.websocket.org/';


@Injectable()
export class DataService {



  constructor() { }


  data() {
    const ws = new WebSocket(CHAT_URL);



  }

}
