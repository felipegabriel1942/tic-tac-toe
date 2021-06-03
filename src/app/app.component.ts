import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from './components/modal/modal.service';
import { Player } from './models/player.model';

enum ModalId {
  Welcome = 'welcome',
  GameOver = 'game-over'
}

enum GameAudio {
  GameOver = '../assets/audio/game-over.wav',
  GameWon = '../assets/audio/game-won.wav',
  GameTie = '../assets/audio/game-draw.wav',
  FieldClick = '../assets/audio/field-click.wav'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  fieldValues: number[] = [];
  playerOnTurn: Player;
  winnerPlayer: Player;
  players: Player[] = [];
  victoryConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.createFields();
    this.createPlayers();
    this.setFirstPlayer();
  }

  ngAfterViewInit(): void {
    this.modalService.openModal(ModalId.Welcome);
  }

  createPlayers(): void {
    const player1 = new Player({
      name: 'jogador',
      mark: 0,
    });

    const player2 = new Player({
      name: 'roboto',
      mark: 1,
    });

    this.players.push(...[player1, player2]);
  }

  restartGame(): void {
    this.closeGameOverModal();
    this.winnerPlayer = null;
    this.createFields();
    this.setFirstPlayer();
  }

  closeGameOverModal(): void {
    this.modalService.closeModal(ModalId.GameOver);
  }

  createFields(): void {
    this.fieldValues = [];

    for (let i = 0; i < 9; i++) {
      this.fieldValues.push(null);
    }
  }

  setFirstPlayer(): void {
    this.playerOnTurn = this.players[0];
  }

  onPlayerMove(index: number): void {
    if (this.cannotMakeMove(index)) {
      return;
    }

    this.playSound(GameAudio.FieldClick);

    this.fieldValues[index] = this.playerOnTurn.mark;

    this.checkGameState();
    this.changePlayerTurn();
    this.makeRobotoAction();

    if (this.isGameTie()) {
      this.playSound(GameAudio.GameTie);
      this.openGameOverModal();
    }
  }

  cannotMakeMove(index: number): boolean {
    return (
      this.isGameWon() ||
      this.isGameTie() ||
      this.robotoIsPlaying() ||
      this.isFieldAlredyMarked(index)
    );
  }

  robotoIsPlaying(): boolean {
    return this.playerOnTurn.name.includes('roboto');
  }

  makeRobotoAction(): void {
    if (this.isGameWon() || this.isGameTie()) {
      return;
    }

    setTimeout(() => {
      this.choseOneFieldForRoboto();
      this.checkGameState();
      this.changePlayerTurn();
    }, 1000);
  }

  checkGameState(): void {
    this.victoryConditions.forEach((indexes) => this.checkForWinner(indexes));
  }

  changePlayerTurn(): void {
    this.playerOnTurn = this.players.filter(
      (player) => player.name !== this.playerOnTurn.name
    )[0];
  }

  isGameWon(): boolean {
    return this.winnerPlayer != null;
  }

  isGameTie(): boolean {
    return (
      this.fieldValues.filter((value) => value == null).length === 0 &&
      !this.isGameWon()
    );
  }

  choseOneFieldForRoboto(): void {
    let chosenField;

    if (this.onlyOneFieldMarked()) {
      chosenField = this.choseRandomField();
    } else {
      chosenField = this.choseBestField();
    }

    this.markRobotoField(chosenField);
  }

  markRobotoField(field: number): void {
    if (this.isFieldAlredyMarked(field)) {
      this.choseOneFieldForRoboto();
    } else {
      this.fieldValues[field] = 1;
    }
  }

  isFieldAlredyMarked(index: number): boolean {
    return this.fieldValues[index] != null;
  }

  choseRandomField(): number {
    return Math.floor(Math.random() * 9);
  }

  choseBestField(): number {
    const linesWithTwoFieldMarked = this.getLinesWithTwoFieldsMarked();

    const linesMarkedByRoboto = this.getLinesMarkedByRoboto(
      linesWithTwoFieldMarked
    );

    if (linesMarkedByRoboto.length > 0) {
      return this.getFieldNotMarkedInLine(linesMarkedByRoboto[0]);
    } else if (
      linesMarkedByRoboto.length === 0 &&
      linesWithTwoFieldMarked.length > 0
    ) {
      return this.getFieldNotMarkedInLine(linesWithTwoFieldMarked[0]);
    } else {
      return this.choseRandomField();
    }
  }

  getLinesWithTwoFieldsMarked(): number[][] {
    return this.victoryConditions
      .filter((line) => this.lineHaveOnlyOneFieldLeft(line))
      .filter((line) => this.lineHaveTwoFieldsMarkedBySamePlayer(line));
  }

  getLinesMarkedByRoboto(lines: number[][]): number[][] {
    return lines.filter((line) => line.reduce((acc, v) => acc + v) === 2);
  }

  getFieldNotMarkedInLine(line: number[]): number {
    return line.filter((field) => this.fieldValues[field] == null)[0];
  }

  lineHaveOnlyOneFieldLeft(line: number[]): boolean {
    return this.getMarkedFields(line).length === 2;
  }

  lineHaveTwoFieldsMarkedBySamePlayer(line: number[]): boolean {
    return this.getMarkedFields(line).reduce((acc, v) => acc + v) !== 1;
  }

  onlyOneFieldMarked(): boolean {
    return this.fieldValues.filter((v) => v != null).length === 1;
  }

  checkForWinner(indexes: number[]): void {
    const markedFields = this.getMarkedFields(indexes);

    if (markedFields.length !== indexes.length) {
      return;
    }

    const fieldsValuesSum = markedFields.reduce((acc, v) => acc + v);

    if (this.isVictorious(fieldsValuesSum)) {
      this.winnerPlayer = this.playerOnTurn;
      this.winnerPlayer.pontuation++;
      const index = this.players.indexOf(this.winnerPlayer);
      this.players[index] = this.winnerPlayer;
      this.openGameOverModal();
      this.playGameOverSound();
    }
  }

  getMarkedFields(fields: number[]): number[] {
    return fields
      .map((index) => this.fieldValues[index])
      .filter((value) => value != null);
  }

  isVictorious(fieldsValuesSum: number): boolean {
    return fieldsValuesSum === 0 || fieldsValuesSum === 3;
  }
  openGameOverModal(): void {
    this.modalService.openModal(ModalId.GameOver);
  }

  closeWelcomeModal(): void {
    this.modalService.closeModal(ModalId.Welcome);
  }

  playGameOverSound(): void {
    if (this.winnerPlayer.name === 'roboto') {
      this.playSound(GameAudio.GameOver);
    } else {
      this.playSound(GameAudio.GameWon);
    }
  }

  playSound(src: string): void {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }
}
