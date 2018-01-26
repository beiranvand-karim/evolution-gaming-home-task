import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'max-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {



  form: FormGroup;

  after_id = new FormControl('', [Validators.required, Validators.minLength(1)]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  participants = new FormControl('', [Validators.required, Validators.minLength(1)]);



  constructor(
    private formBuilder: FormBuilder,
    public chatService: ChatService
  ) {
    this.form = this.formBuilder.group({
      after_id: this.after_id,
      name: this.name,
      participants: this.participants
    });
  }

  ngOnInit() {
  }


  addTable() {

    const add = {
      '$type': 'add_table',
      'after_id': + this.form.controls.after_id.value,
      'table': {
        'name': this.form.controls.name.value,
        'participants': + this.form.controls.participants.value
      }
    };

    this.chatService.messages.next(add);

  }

}