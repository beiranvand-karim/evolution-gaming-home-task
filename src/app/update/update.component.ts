import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'max-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  edit_Form: FormGroup;
  edit_name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  edit_participants = new FormControl('', [Validators.required, Validators.minLength(1)]);


  @Input() id: number;

  constructor(
    private formBuilder: FormBuilder,
    public chatService: ChatService
  ) {

    this.edit_Form = this.formBuilder.group({
      edit_name: this.edit_name,
      edit_participants: this.edit_participants
    });
  }

  ngOnInit() {
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

}
