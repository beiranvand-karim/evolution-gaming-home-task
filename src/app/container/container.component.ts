import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {UserInterfaceService} from '../services/user-interface.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'max-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
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
export class ContainerComponent implements OnInit {

  slide = false;

  constructor(
    public chatService: ChatService,
    public userInterfaceService: UserInterfaceService,
    private router: Router
  ) {
    chatService.messages.subscribe();
  }

  ngOnInit(): void {
    this.userInterfaceService.slide$.subscribe(data => {
      this.slide = data;

    });
  }

  logOut() {

    const login = {
      '$type': 'logout'
    };

    this.chatService.messages.next(login);
    this.router.navigate(['/']);

  }

  toggleSlide() {
    this.slide = !this.slide;
  }

  change() {
    return this.slide === true ? 'in' : 'out';
  }

  unsubscribe() {

    const order = {
      '$type': 'unsubscribe_tables'
    };

    this.chatService.messages.next(order);

  }
}
