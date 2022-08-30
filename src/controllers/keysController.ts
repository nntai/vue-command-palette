import {
  ref, Ref, computed, watch, onMounted,
} from 'vue';
import { isCorrectKey } from '../methods/keyCorrection';
import GroupCommand from '../models/groupCommand';

const keysController = (
  onModalChange: (isModalOpen: boolean) => void,
  modalKey: string,
  customerGroupCommands: Ref<GroupCommand[]>,
  previousCustomerGroupCommand: () => void,
  nextCustomerGroupCommand: () => void,
  onEnterKey: () => void,
) => {
  const keys: Ref<string[]> = ref([]);
  const isArrowUp: Ref<boolean> = ref(false);
  const isArrowDown: Ref<boolean> = ref(false);

  const closeKey = 'Escape';
  const downKey = 'ArrowDown';

  const upKey = 'ArrowUp';
  const enterKey = 'Enter';

  const altKey = 'Alt';

  const controlKey = 'Control';

  const shiftKey = 'Shift';

  function addKey (key: string) {
    if (keys.value.indexOf(key) === -1) {
      keys.value.push(key);
    }
  }

  function deleteKey (key: string) {
    if (keys.value.indexOf(key) !== -1) {
      keys.value.splice(keys.value.indexOf(key), 1);
    }
  }

  function onKeyDownInput (this: Window, e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    if (target?.tagName !== 'INPUT') {
      e.preventDefault();
      addKey(e.key);
    } else if (
      e.key === upKey
        || e.key === downKey
        || e.key === closeKey
        || e.key === altKey
        || e.key === controlKey
        || e.key === shiftKey
    ) {
      e.preventDefault();
      addKey(e.key);
    } else if (keys.value.length !== 0) {
      if (
        keys.value[0] === altKey
            || keys.value[0] === controlKey
            || keys.value[0] === shiftKey
      ) {
        e.preventDefault();
        addKey(e.key);
      }
    }
  }

  function onKeyUpInput (this: Window, e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    if (target?.tagName !== 'INPUT') {
      e.preventDefault();
      if (e.key === upKey) {
        isArrowUp.value = false;
      }
      if (e.key === downKey) {
        isArrowDown.value = false;
      }
      deleteKey(e.key);
    } else {
      if (e.key === upKey || e.key === downKey) {
        if (e.key === upKey) {
          isArrowUp.value = false;
        }
        if (e.key === downKey) {
          isArrowDown.value = false;
        }
      }
      e.preventDefault();
      deleteKey(e.key);
    }
  }

  function isCustomerKey (key: string) {
    let isIn = false;
    if (isCorrectKey(keys.value, key)) {
      isIn = true;
    }

    return isIn;
  }

  function isCloseKey () {
    let isIn = false;

    if (isCustomerKey(closeKey)) {
      isIn = true;
    }
    return isIn;
  }

  function isDownKey () {
    let isIn = false;

    if (isCustomerKey(downKey)) {
      isIn = true;
    }
    return isIn;
  }

  function isUpKey () {
    let isIn = false;

    if (isCustomerKey(upKey)) {
      isIn = true;
    }
    return isIn;
  }

  function isEnterKey () {
    let isIn = false;
    if (isCustomerKey(enterKey)) {
      isIn = true;
    }
    return isIn;
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDownInput);
    window.addEventListener('keyup', onKeyUpInput);
  });

  const keyCount = computed(() => {
    return keys.value.length;
  });

  watch(keyCount, (value) => {
    if (value > 0) {
      let isIn = false;
      if (isCustomerKey(modalKey)) {
        onModalChange(true);
        isIn = true;
      }
      if (isCloseKey()) {
        onModalChange(false);
        isIn = true;
      }
      let isExecuted = false;
      for (let i = 0; i < customerGroupCommands.value.length; ++i) {
        if (isExecuted) {
          break;
        } else {
          for (
            let j = 0;
            j < customerGroupCommands.value[i].getCommands().length;
            j++
          ) {
            if (
              isCustomerKey(
                customerGroupCommands.value[i].getCommands()[j].command.getCommandKey(),
              )
            ) {
              const action = customerGroupCommands.value[i].getCommands()[j].command.getCommandAction();
              action();
              onModalChange(false);
              isIn = true;
              isExecuted = true;
              break;
            }
          }
        }
      }

      if (isDownKey()) {
        isArrowDown.value = true;
        nextCustomerGroupCommand();
        isIn = true;
      }

      if (isUpKey()) {
        isArrowUp.value = true;
        previousCustomerGroupCommand();
        isIn = true;
      }

      if (isEnterKey()) {
        onEnterKey();

        isIn = true;
      }

      if (isIn) {
        keys.value = [];
      }
    }
  });

  return {
    keys,
    addKey,
    deleteKey,
    onKeyDownInput,
    onKeyUpInput,
    isCustomerKey,
    isCloseKey,
    isArrowDown,
    isArrowUp,
  };
};

export default keysController;
