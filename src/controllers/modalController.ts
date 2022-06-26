import { ref, Ref } from "vue";

export default function modalController() {
  const isModal: Ref<boolean> = ref(false);

  function onModalChange(value: boolean) {
    isModal.value = value;
  }

  function openModal() {
    onModalChange(true);
  }

  function closeModal() {
    onModalChange(false);
  }

  return {
    isModal,
    onModalChange,
    openModal,
    closeModal,
  };
}
