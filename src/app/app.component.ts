import {Component, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';

@Component({
  selector: 'max-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    public chatService: ChatService
  ) {
    chatService.messages.subscribe();
  }

  ngOnInit(): void {

  }

  delete(id: number) {

    const remove = {
      '$type': 'remove_table',
      'id': id
    };

    this.chatService.addToRemovalCandidates(id);
    this.chatService.removeFromTableList(id);

    this.chatService.messages.next(remove);
  }

  subscribe() {


    let order;

    const login = {
      '$type': 'login',
      'username': 'user1234',
      'password': 'password1234'
    };

    this.chatService.messages.next(login);


    order = {
      '$type': 'subscribe_tables'
    };


    this.chatService.messages.next(order);
  }


  unsubscribe() {

    const order = {
      '$type': 'unsubscribe_tables'
    };

    this.chatService.messages.next(order);

  }




}
