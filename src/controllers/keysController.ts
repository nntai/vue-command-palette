import { ref, Ref, computed, watch, onMounted } from "vue";

import { isCorrectKey } from "../places/firstPlace";
import Command from "../models/command";
import GroupCommand from "../models/groupCommand";
export default function keysController(
  onModalChange: Function,
  modalKey: string,
  customerGroupCommands: GroupCommand[],
  previousCustomerGroupCommand: Function,
  nextCustomerGroupCommand: Function,
  onEnterKey: Function
) {
  const keys: Ref<string[]> = ref([]);
  const isArrowUp: Ref<boolean> = ref(false);
  const isArrowDown: Ref<boolean> = ref(false);
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
    if (e.target.tagName !== "INPUT") {
      e.preventDefault();

      addKey(e.key);
    } else {
      if (e.key === upKey || e.key === downKey) {
        e.preventDefault();
        addKey(e.key);
      }
    }
  }

  function onKeyUpInput(e: {
    target: { tagName: string };
    preventDefault: Function;
    key: string;
  }) {
    if (e.target.tagName !== "INPUT") {
      e.preventDefault();

      deleteKey(e.key);
    } else {
      if (e.key === upKey || e.key === downKey) {
        e.preventDefault();

        if(e.key===upKey){
          isArrowUp.value = false;
        }
        if(e.key===downKey){
          isArrowDown.value=false;
        }
        deleteKey(e.key);
      }
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

      for (let i: number = 0; i < customerGroupCommands.length; ++i) {
        for (let j:number = 0; j < customerGroupCommands[i].getCommands().length;j ++){
          if (isCustomerKey(customerGroupCommands[i].getCommands()[j].command.getCommandKey())) {
            let action: Function = () => {};
  
            action = customerGroupCommands[i].getCommands()[j].command.getCommandAction();
  
            action();
  
            onModalChange(false);
  
            isIn = true;
          }
        }
      }

      if (isDownKey()) {
        nextCustomerGroupCommand();
        isArrowDown.value = true;
        isIn = true;
      }

      if (isUpKey()) {
        previousCustomerGroupCommand();
        isArrowUp.value = true;
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
    isArrowUp
  };
}
