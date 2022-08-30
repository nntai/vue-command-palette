import modalController from './modalController.ts';
import customerInputController from './customerInputController.ts';

import customerCommandController from './customerCommandController.ts';

import command from '../models/command.ts';

describe('modal controller', () => {
  const commands = [new command('place', 'm', () => {}), new command('place place', 'b', () => {}), new command('place place place', 'm+b', () => {})];
  const { customerInput, clearText } = customerInputController();
  const { commandRefresh } = customerCommandController(customerInput, commands);

  const customerModalController = modalController(() => { commandRefresh(); clearText(); });

  it('modal controller', () => {
    customerModalController.onModalChange(true);

    expect(customerModalController.isModal.value === true);
  });
});
