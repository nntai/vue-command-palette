import { ref, Ref } from "vue";

export default function customerInputController() {
  const customerInput: Ref<string> = ref("");

  const isInputBlurred: Ref<boolean> = ref(true);

  const isTextCleared: Ref<boolean> = ref(false);

  function clearText() {
    isTextCleared.value = true;

    customerInput.value = "";
  }

  return {
    customerInput,
    clearText,
    isInputBlurred,
    isTextCleared,
  };
}
