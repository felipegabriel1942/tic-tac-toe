import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() values: number[] = [];
  @Output() onPlayerMove = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
