import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  animations: [
    trigger('clickedState', [
      state(
        '',
        style({
          fontSize: '0px',
        })
      ),
      state(
        'clicked',
        style({
          fontSize: '60px',
        })
      ),
      transition('* => clicked', animate('0s 300ms ease-in')),
    ]),
  ],
})
export class FieldComponent implements OnInit {
  @Input() fieldMark: number;
  @Input() index: number;

  // clickInfo = 'default';
  finishedAnimation = false;

  constructor() {}

  isDone() {

  }

  ngOnInit(): void {
    // console.log(this.clickInfo);
    console.log(this.index);
  }

  onClicked(): void {
    // this.clickInfo = 'clicked';
    // console.log(this.clickInfo);
  }

  get mark(): string {
    const marks = {
      0: 'X',
      1: 'O',
    };

    return marks[this.fieldMark];
  }

  get style(): any {
    const colors = {
      0: 'red',
      1: 'blue',
    };

    const background = {
      0: '#f5e1e5',
      1: '#e7e6ed',
    };

    return {
      color: colors[this.fieldMark],
      background: background[this.fieldMark],
    };
  }
}
