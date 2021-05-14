import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() fieldMark: number;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

  get mark(): string {
    const marks = {
      0: 'X',
      1: 'O'
    };

    return marks[this.fieldMark];

  }

}
