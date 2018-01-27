import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../classes/table';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'max-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss']
})
export class TableItemComponent implements OnInit {


  @Input() table: Table;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
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

}
