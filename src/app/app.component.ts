import {Component, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'max-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  msg: string;

  constructor(
    public chatService: ChatService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

  }

  delete(id: number) {

    console.log(id);

    const remove = {
      '$type': 'remove_table',
      'id': id
    };

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
