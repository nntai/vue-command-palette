import { ref, Ref, computed, watch, onMounted } from "vue";

import { isText } from "../places/firstPlace";

export default function keysController(
  onModalChange: Function,
  modalKey: string,
  customerCommands: {
    commandName: string;
    commandKey: string;
    commandAction: Function;
  }[]
) {
  const keys: Ref<string[]> = ref([]);

  const closeKey: string = "Escape";

  function addKey(key: string) {
    if (-1 == keys.value.indexOf(key)) {
      keys.value.push(key);
    }
  }

  function deleteKey(key: string) {
    if (-1 != keys.value.indexOf(key)) {
      keys.value.splice(keys.value.indexOf(key), 1);
    }
  }

  function onKeyDownInput(e: {
    target: { tagName: string };
    preventDefault: Function;
    key: string;
  }) {
    if ("INPUT" != e.target.tagName) {
      e.preventDefault();

      addKey(e.key);
    }
  }

  function onKeyUpInput(e: {
    target: { tagName: string };
    preventDefault: Function;
    key: string;
  }) {
    if ("INPUT" != e.target.tagName) {
      e.preventDefault();

      deleteKey(e.key);
    }
  }

  function isCustomerKey(key: string) {
    let isIn: boolean = false;

    if (isText(keys.value, key)) {
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

  onMounted(() => {
    window.addEventListener("keydown", onKeyDownInput);
    window.addEventListener("keyup", onKeyUpInput);
  });

  const keyCount = computed(() => {
    return keys.value.length;
  });

  watch(keyCount, (value) => {
    if (0 < value) {
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
        if (isCustomerKey(customerCommands[i].commandKey)) {
          customerCommands[i].commandAction();

          isIn = true;
        }
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
