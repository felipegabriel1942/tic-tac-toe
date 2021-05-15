import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent implements OnInit {
  @Input() players: Player[] = [];

  constructor() {}

  ngOnInit(): void {}
}
