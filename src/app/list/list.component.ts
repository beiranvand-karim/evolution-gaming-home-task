import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'max-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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

    const order = {
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
