import { ref, Ref, computed, watch, onMounted } from "vue";

import { isCorrectKey } from "../places/firstPlace";
import Command from "../models/command";

export default function keysController(
  onModalChange: Function,
  modalKey: string,
  customerCommands: Command[],
  previousCustomerCommand: Function,
  nextCustomerCommand: Function,
  onEnterKey: Function
) {
  const keys: Ref<string[]> = ref([]);

  const closeKey: string = "Escape";
  const downKey: string = "ArrowDown";

  const upKey: string = "ArrowUp";

  const enterKey: string = "Enter";

  function addKey(key: string) {
    if (keys.value.indexOf(key) == -1) {
      keys.value.push(key);
    }
  }

  function deleteKey(key: string) {
    if (keys.value.indexOf(key) != -1) {
      keys.value.splice(keys.value.indexOf(key), 1);
    }
  }

  function onKeyDownInput(e: {
    target: { tagName: string };
    preventDefault: Function;
    key: string;
  }) {
    if (e.target.tagName != "INPUT") {
      e.preventDefault();

      addKey(e.key);
    }
  }

  function onKeyUpInput(e: {
    target: { tagName: string };
    preventDefault: Function;
    key: string;
  }) {
    if (e.target.tagName != "INPUT") {
      e.preventDefault();

      deleteKey(e.key);
    }
  }

  function isCustomerKey(key: string) {
    let isIn: boolean = false;

    if (isCorrectKey(keys.value, key)) {
      isIn = true;
    }

    return isIn;
  }

  function isCloseKey() {
    let isIn: boolean = false;

    if (isCustomerKey(closeKey)) {
      isIn = true;
    }

    return isIn;
  }

  function isDownKey() {
    let isIn: boolean = false;

    if (isCustomerKey(downKey)) {
      isIn = true;
    }

    return isIn;
  }

  function isUpKey() {
    let isIn: boolean = false;

    if (isCustomerKey(upKey)) {
      isIn = true;
    }

    return isIn;
  }

  function isEnterKey() {
    let isIn: boolean = false;

    if (isCustomerKey(enterKey)) {
      isIn = true;
    }

    return isIn;
  }

  onMounted(() => {
    window.addEventListener("keydown", onKeyDownInput);
    window.addEventListener("keyup", onKeyUpInput);
  });

  const keyCount = computed(() => {
    return keys.value.length;
  });

  watch(keyCount, (value) => {
    if (value > 0) {
      let isIn: boolean = false;

      if (isCustomerKey(modalKey)) {
        onModalChange(true);
        isIn = true;
      }

      if (isCloseKey()) {
        onModalChange(false);
        isIn = true;
      }

      for (let i: number = 0; i < customerCommands.length; ++i) {
        if (isCustomerKey(customerCommands[i].getCommandKey())) {
          let action: Function = () => {};

          action = customerCommands[i].getCommandAction();

          action();

          onModalChange(false);

          isIn = true;
        }
      }

      if (isDownKey()) {
        nextCustomerCommand();

        isIn = true;
      }

      if (isUpKey()) {
        previousCustomerCommand();

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
  };
}
