import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserInterfaceService} from '../services/user-interface.service';

@Component({
  selector: 'max-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('slide', [
      state('in', style({
        overflow: 'visible',
        paddingTop: '10px',
        paddingBottom: '10px'
      })),
      state('out',   style({
        height: '0',
        overflow: 'hidden',
        paddingBottom: '0',
      })),
      transition('in <=> out', animate('200ms ease-in-out'))
    ])
  ]
})
export class ListComponent implements OnInit {

  slide = false;

  constructor(
    public chatService: ChatService,
    public userInterfaceService: UserInterfaceService
  ) {
    chatService.messages.subscribe();
  }

  ngOnInit(): void {
    this.userInterfaceService.slide$.subscribe(data => {
        this.slide = data;

      });
  }

  toggleSlide() {
    this.slide = !this.slide;
  }

  change() {
    return this.slide === true ? 'in' : 'out';
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
