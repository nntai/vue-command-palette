import { ref, Ref, watch } from 'vue';

export default function modalController (
  onModalClosed: Function,
  onModalOpened: Function,
) {
  const isModal: Ref<boolean> = ref(false);

  function onModalChange (value: boolean) {
    isModal.value = value;
  }

  function openModal () {
    onModalChange(true);
  }

  function closeModal () {
    onModalChange(false);
  }

  watch(isModal, (value) => {
    if (value) {
      onModalOpened();
    } else {
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
