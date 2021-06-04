import { query } from '@angular/animations';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let spectator: Spectator<BoardComponent>;

  const createComponent = createComponentFactory(BoardComponent);

  beforeEach(() =>  {
    spectator = createComponent();
    spectator.setInput('values', [null, null]);
  });

  it('should create fields', () => {
    expect(spectator.query('app-field')).toBeTruthy();
  });

  it('should emit index of field clicked', () => {
    spyOn(spectator.component.onPlayerMove, 'emit');
    spectator.triggerEventHandler('app-field', 'click', 0);
    expect(spectator.component.onPlayerMove.emit).toHaveBeenCalledWith(0);
  });
});
