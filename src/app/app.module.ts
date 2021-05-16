import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { BoardComponent } from './components/board/board.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { GameControlComponent } from './components/game-control/game-control.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    ScoreboardComponent,
    ModalComponent,
    BoardComponent,
    GameoverComponent,
    GameControlComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
