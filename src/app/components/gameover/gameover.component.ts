import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css'],
})
export class GameoverComponent implements OnInit {
  @Input() winnerPlayer: Player;

  @Output() onCloseModal = new EventEmitter();
  @Output() onRestartGame = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
