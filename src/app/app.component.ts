import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fieldValues: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createFields();
  }

  createFields(): void {
    for (let i = 0; i < 9; i++) {
      this.fieldValues.push(...[null]);
    }
  }
}
