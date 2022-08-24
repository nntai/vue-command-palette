import keysController from './keysController.ts';
import modalController from './modalController.ts';

import customerInputController from './customerInputController.ts';

import customerCommandController from './customerCommandController.ts';

import command from '../models/command.ts';

describe('keys controller', () => {
  const commands = [new command('place', 'm', () => {}), new command('place place', 'b', () => {}), new command('place place place', 'm+b', () => {})];
  const { customerInput, clearText } = customerInputController();
  const {
    commandRefresh, customerCommand, previousCustomerCommand, nextCustomerCommand,
  } = customerCommandController(customerInput, commands);

  const { onModalChange, closeModal } = modalController(() => { commandRefresh(); clearText(); });

  const onEnterKey = () => {
    let action = () => {};
    action = customerCommand.value.getCommandAction();
    action();
    closeModal();
  };

  const keysInputController = keysController(onModalChange, 'Control+k', commands, previousCustomerCommand, nextCustomerCommand, onEnterKey);

  it('keys controller', () => {
    keysInputController.addKey('m');
    expect((keysInputController.keys.value.indexOf('m') !== -1) === true);
  });

  it('keys controller', () => {
    keysInputController.deleteKey('m');
    expect((keysInputController.keys.value.indexOf('m') === -1) === true);
  });
});
