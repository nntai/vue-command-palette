import { ref, Ref } from "vue";

export default function customerInputController() {
  const customerInput: Ref<string> = ref("");

  const isInputBlurred: Ref<boolean> = ref(true);

  function clearText() {
    customerInput.value = "";
  }

  return {
    customerInput,
    clearText,
    isInputBlurred,
  };
}
