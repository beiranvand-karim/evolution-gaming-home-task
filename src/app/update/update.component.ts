import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../services/chat.service';
import {Table} from '../classes/table';
import {UserInterfaceService} from '../services/user-interface.service';

@Component({
  selector: 'max-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  edit_Form: FormGroup;
  edit_name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  edit_participants = new FormControl('', [Validators.required, Validators.minLength(1)]);


  @Input() table: Table;

  constructor(
    private formBuilder: FormBuilder,
    public chatService: ChatService,
    private userInterfaceService: UserInterfaceService
  ) {

    this.edit_Form = this.formBuilder.group({
      edit_name: this.edit_name,
      edit_participants: this.edit_participants
    });
  }

  ngOnInit() {

    this.edit_Form.patchValue({
      edit_name: this.table.name,
      edit_participants: this.table.participants
    });
  }

  close() {
    this.userInterfaceService.slideUpdateOut();
  }

  editTable() {

    const update = {

      '$type': 'update_table',
      'table': {
        'id': this.table.id,
        'name': this.edit_Form.controls.edit_name.value,
        'participants':  + this.edit_Form.controls.edit_participants.value
      }
    };
    this.chatService.messages.next(update);

  }

}
