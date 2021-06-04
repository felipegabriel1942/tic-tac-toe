import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Player } from 'src/app/models/player.model';
import { GameControlComponent } from './game-control.component';

describe('GameControl', () => {
  let spectator: Spectator<GameControlComponent>;

  const createComponent = createComponentFactory(GameControlComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should show some text when player is human', () => {
    spectator.setInput('player', new Player({
      name: 'jogador'
    }));

    expect(spectator.query('p')).toHaveText('Sua vez...');
  });

  it('should show some text when player is roboto', () => {
    spectator.setInput('player', new Player({
      name: 'roboto'
    }));

    expect(spectator.query('p')).toHaveText('ROBOTO está jogando...');
  });
});
