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
      this.msg = msg;
    });


    this.form = this.formBuilder.group({
      messageControl: this.messageControl
    });
  }

  sendMsg() {
    this.chatService.messages.next(this.form.controls.messageControl.value);
  }


}
