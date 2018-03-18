import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'max-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {



  logInForm: FormGroup;

  username = new FormControl('user1234', [Validators.required, Validators.minLength(3)]);
  password = new FormControl('password1234', [Validators.required, Validators.minLength(3)]);

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder,
  ) {

    this.logInForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });

  }

  ngOnInit() {
    this.chatService.messages.subscribe();
  }


  login() {

    const login = {
      '$type': 'login',
      'username': this.logInForm.controls.username.value,
      'password': this.logInForm.controls.password.value
    };

    this.chatService.messages.next(login);
  }


  subscribe() {

    this.login();

    const order = {
      '$type': 'subscribe_tables'
    };


    this.chatService.messages.next(order);
  }



}
