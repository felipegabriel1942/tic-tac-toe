import { Component, OnInit } from '@angular/core';
import { Player } from './models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fieldValues: number[] = [];
  playerOnTurn: Player;
  players: Player[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createFields();
    this.createPlayers();
    this.setFirstPlayer();
  }

  restartGame(): void {
    this.fieldValues = [];
    this.createFields();
    this.setFirstPlayer();
  }

  createFields(): void {
    for (let i = 0; i < 9; i++) {
      this.fieldValues.push(null);
    }
  }

  createPlayers(): void {
    const player1 = new Player({
      name: 'Mario',
      mark: 0
    });

    const player2 = new Player({
      name: 'Luigi',
      mark: 1
    });

    this.players.push(...[player1, player2]);
  }

  setFirstPlayer(): void {
    this.playerOnTurn = this.players[0];
  }

  setValueOnField(index: number): void {
    this.fieldValues[index] = this.playerOnTurn.mark;
    this.changePlayerTurn();
  }

  changePlayerTurn(): void {
    this.playerOnTurn = this.players
      .filter(player => player !== this.playerOnTurn)[0];
  }
}
