import { ref, Ref } from 'vue';

const customerInputController = () => {
  const customerInput: Ref<string> = ref('');
  const isInputBlurred: Ref<boolean> = ref(true);
  const isTextCleared: Ref<boolean> = ref(false);

  const clearText = () => {
    isTextCleared.value = true;
    customerInput.value = '';
  };

  return {
    customerInput,
    clearText,
    isInputBlurred,
    isTextCleared,
  };
};

export default customerInputController;
