import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() fieldMark: number;

  constructor() {}

  ngOnInit(): void {}

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
