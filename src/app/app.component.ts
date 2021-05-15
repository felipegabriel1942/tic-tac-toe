import { Component, OnInit } from '@angular/core';
import { Player } from './models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  fieldValues: number[] = [];
  playerOnTurn: Player;
  winnerPlayer: Player;
  players: Player[] = [];

  constructor() {}

  ngOnInit(): void {
    this.createFields();
    this.createPlayers();
    this.setFirstPlayer();
  }

  restartGame(): void {
    this.winnerPlayer = null;
    this.createFields();
    this.setFirstPlayer();
  }

  createFields(): void {
    this.fieldValues = [];

    for (let i = 0; i < 9; i++) {
      this.fieldValues.push(null);
    }
  }

  createPlayers(): void {
    const player1 = new Player({
      name: 'Mario',
      mark: 0,
    });

    const player2 = new Player({
      name: 'Luigi',
      mark: 1,
    });

    this.players.push(...[player1, player2]);
  }

  setFirstPlayer(): void {
    this.playerOnTurn = this.players[0];
  }

  setValueOnField(index: number): void {
    if (this.isGameWon()) {
      return;
    }

    if (this.isFieldAlredyMarked(index)) {
      return;
    }

    this.fieldValues[index] = this.playerOnTurn.mark;

    this.checkGameState();
    this.changePlayerTurn();
  }

  isFieldAlredyMarked(index: number): boolean {
    return this.fieldValues[index] != null;
  }

  isGameWon(): boolean {
    return this.winnerPlayer != null;
  }

  checkGameState(): void {
    const victoryConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    victoryConditions.forEach((indexes) => this.checkForWinner(indexes));
  }

  checkForWinner(indexes: number[]): void {
    const markedFields = indexes
      .map((index) => this.fieldValues[index])
      .filter((value) => value != null);

    if (markedFields.length !== indexes.length) {
      return;
    }

    const fieldsValuesSum = markedFields.reduce((acc, v) => acc + v);

    if (this.isVictorious(fieldsValuesSum)) {
      this.winnerPlayer = this.playerOnTurn;
      this.winnerPlayer.pontuation++;
      const index = this.players.indexOf(this.winnerPlayer);
      this.players[index] = this.winnerPlayer;
    }
  }

  isVictorious(fieldsValuesSum: number): boolean {
    return fieldsValuesSum === 0 || fieldsValuesSum === 3;
  }

  changePlayerTurn(): void {
    this.playerOnTurn = this.players.filter(
      (player) => player.name !== this.playerOnTurn.name
    )[0];
  }
}
