import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
const resolvePromise = ref(null);

export function useConfirmToast() {
  const showConfirm = (msg) => {
    return new Promise((resolve) => {
      message.value = msg;
      isVisible.value = true;
      resolvePromise.value = resolve;
    });
  };

  const handleConfirm = () => {
    isVisible.value = false;
    resolvePromise.value(true);
  };

  const handleCancel = () => {
    isVisible.value = false;
    resolvePromise.value(false);
  };

  return {
    isVisible,
    message,
    showConfirm,
    handleConfirm,
    handleCancel
  };
}