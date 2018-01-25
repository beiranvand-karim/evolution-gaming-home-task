import {Component, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'max-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  form: FormGroup;
  edit_Form: FormGroup;

  after_id = new FormControl('', [Validators.required, Validators.minLength(1)]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  participants = new FormControl('', [Validators.required, Validators.minLength(1)]);


  edit_name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  edit_participants = new FormControl('', [Validators.required, Validators.minLength(1)]);

  msg: string;

  constructor(
    public chatService: ChatService,
    private formBuilder: FormBuilder
  ) {
    chatService.messages.subscribe(msg => {
      this.msg = msg;
    });

    this.form = this.formBuilder.group({
      after_id: this.after_id,
      name: this.name,
      participants: this.participants
    });

    this.edit_Form = this.formBuilder.group({
      edit_name: this.edit_name,
      edit_participants: this.edit_participants
    });
  }

  ngOnInit(): void {

  }

  editTable(id: number) {



    const update = {

      '$type': 'update_table',
      'table': {
        'id': id,
        'name': this.edit_Form.controls.edit_name.value,
        'participants':  + this.edit_Form.controls.edit_participants.value
      }
    };


    this.chatService.messages.next(update);

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


  delete(id: number) {

    console.log(id);

    const remove = {
      '$type': 'remove_table',
      'id': id
    };

    this.chatService.removeTable(id);

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
