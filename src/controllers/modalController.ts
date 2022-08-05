import { ref, Ref, watch } from "vue";

export default function modalController(onModalClosed: Function) {
  const isModal: Ref<boolean> = ref(true);

  function onModalChange(value: boolean) {
    isModal.value = value;
  }

  function openModal() {
    onModalChange(true);
  }

  function closeModal() {
    onModalChange(false);
  }

  watch(isModal, (value) => {
    if (!value) {
      onModalClosed();
    }
  });

  return {
    isModal,
    onModalChange,
    openModal,
    closeModal,
  };
}
