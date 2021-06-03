import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let spectator: Spectator<FieldComponent>;

  const createComponent = createComponentFactory(FieldComponent);

  beforeEach(
    () =>
      (spectator = createComponent({
        detectChanges: true,
      }))
  );

  it('should be red when user click', () => {
    spectator.setInput('fieldMark', 0);
    expect(spectator.query('div')).toHaveStyle({
      color: 'red',
      background: '#f5e1e5',
    });
  });

  it('should display an "X" when user click', () => {
    spectator.setInput('fieldMark', 0);
    expect(spectator.query('span')).toHaveText('X');
  });

  it('should be blue when roboto click', () => {
    spectator.setInput('fieldMark', 1);
    expect(spectator.query('div')).toHaveStyle({
      color: 'blue',
      background: '#e7e6ed',
    });
  });

  it('should display an "O" when roboto click', () => {
    spectator.setInput('fieldMark', 1);
    expect(spectator.query('span')).toHaveText('O');
  });
});
