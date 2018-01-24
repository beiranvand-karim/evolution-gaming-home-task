import {Component, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'max-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  form: FormGroup;

  messageControl = new FormControl();


  msg: string;

  constructor(
    public chatService: ChatService,
    private formBuilder: FormBuilder
  ) {
    chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg.author);
      console.log('Response from websocket: ' + msg.message);

      this.msg = msg.message;

    });


    this.form = this.formBuilder.group({
      messageControl: this.messageControl
    });
  }




  sendMsg() {


    const message = {
        author: 'karim',
        message: this.form.controls.messageControl.value
    };

    console.log('new message from client to websocket: ', message);


    this.chatService.messages.next(message);
    message.message = '';
  }


}
