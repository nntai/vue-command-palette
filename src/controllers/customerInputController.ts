import { ref, Ref } from "vue";

export default function customerInputController() {
  const customerInput: Ref<string> = ref("");

  return {
    customerInput,
  };
}
