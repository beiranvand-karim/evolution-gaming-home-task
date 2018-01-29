import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../classes/table';
import {ChatService} from '../services/chat.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserInterfaceService} from '../services/user-interface.service';

@Component({
  selector: 'max-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
  animations: [
    trigger('updateSlide', [
      state('in', style({
        overflow: 'visible'
      })),
      state('out',   style({
        height: '0',
        overflow: 'hidden'
      })),
      transition('in <=> out', animate('200ms ease-in-out'))
    ])
  ]
})
export class TableItemComponent implements OnInit {

  visible = false;

  @Input() table: Table;

  constructor(
    public chatService: ChatService,
    private userInterfaceService: UserInterfaceService
  ) { }

  ngOnInit() {

    this.userInterfaceService.updateSlide$.subscribe(data => {
      this.visible = data;
    });

    // this.userInterfaceService.updateId$.skip(1).subscribe(id => {
    //
    //   if (id === this.table.id) {
    //
    //
    //
    //   }
    // });

  }

  showUpdate(id: number) {
    this.userInterfaceService.setUpdateId(id);
    this.userInterfaceService.toggleSlideUpdate();
  }


  slide() {
    return this.visible ? 'in' : 'out';
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
