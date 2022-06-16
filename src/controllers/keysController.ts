import { ref, Ref } from "vue";

import firstPlace from "../places/firstPlace";

export default function keysController() {
  const keys: Ref<string[]> = ref([]);

  const firstPlaceActions = firstPlace();
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

    if (firstPlaceActions.isText(keys.value, key)) {
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
