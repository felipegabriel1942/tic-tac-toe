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
    this.fieldValues = [];
    this.winnerPlayer = null;
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

    if (this.isFieldMarked(index)) {
      return;
    }

    this.fieldValues[index] = this.playerOnTurn.mark;
    this.checkGameState();
    this.changePlayerTurn();
  }

  isFieldMarked(index: number): boolean {
    return this.fieldValues[index] != null;
  }

  isGameWon(): boolean {
    return this.winnerPlayer != null;
  }

  checkGameState(): void {
    const victoryCondition1 = [
      this.fieldValues[0],
      this.fieldValues[1],
      this.fieldValues[2],
    ];

    const victoryCondition2 = [
      this.fieldValues[3],
      this.fieldValues[4],
      this.fieldValues[5],
    ];

    const victoryCondition3 = [
      this.fieldValues[6],
      this.fieldValues[7],
      this.fieldValues[8],
    ];

    const victoryCondition4 = [
      this.fieldValues[0],
      this.fieldValues[3],
      this.fieldValues[6],
    ];

    const victoryCondition5 = [
      this.fieldValues[1],
      this.fieldValues[4],
      this.fieldValues[7],
    ];

    const victoryCondition6 = [
      this.fieldValues[2],
      this.fieldValues[5],
      this.fieldValues[8],
    ];

    const victoryCondition7 = [
      this.fieldValues[0],
      this.fieldValues[4],
      this.fieldValues[8],
    ];

    const victoryCondition8 = [
      this.fieldValues[2],
      this.fieldValues[4],
      this.fieldValues[6],
    ];

    const validations = [
      victoryCondition1,
      victoryCondition2,
      victoryCondition3,
      victoryCondition4,
      victoryCondition5,
      victoryCondition6,
      victoryCondition7,
      victoryCondition8,
    ];

    validations.forEach((condition) => this.checkForWinner(condition));
  }

  checkForWinner(fields: number[]): void {
    const markedFields = fields.filter((value) => value != null);

    if (markedFields.length !== fields.length) {
      return;
    }

    const fieldsValuesSum = markedFields.reduce((acc, v) => acc + v);

    if (fieldsValuesSum === 0 || fieldsValuesSum === 3) {
      this.winnerPlayer = this.playerOnTurn;
    }
  }

  changePlayerTurn(): void {
    this.playerOnTurn = this.players.filter(
      (player) => player.name !== this.playerOnTurn.name
    )[0];
  }
}
