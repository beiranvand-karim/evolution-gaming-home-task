import {Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'max-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  animations: [
    trigger('popUp', [
      state('_show', style({
        overflow: 'visible',
        paddingTop: '25px',
        paddingBottom: '25px',
        boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)'
      })),
      state('_hide',   style({
        height: '0',
        overflow: 'hidden',
        paddingTop: '0',
        paddingBottom: '0',
        boxShadow: 'none'
      })),
      transition('_show <=> _hide', animate('200ms ease-in-out'))
    ])
  ]
})
export class DropDownComponent implements OnInit {



  private showUp = false;




  constructor() { }

  ngOnInit() {
  }


  get getPopUpState() {
    return this.showUp ? '_show' : '_hide';
  }


  @HostListener('document:click', ['$event']) togglePopUpLink(event) {

    if (event.target.getAttribute('class') === 'fa-chevron-down') {

      this.showUp = ! this.showUp;

      console.log('clicked');

    }
  }
}
