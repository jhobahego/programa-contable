<template>
  <Transition name="fade">
    <div v-if="isVisible" class="confirm-overlay">
      <div class="confirm-toast">
        <p class="message">{{ message }}</p>
        <div class="actions">
          <button @click="handleConfirm" class="btn btn-confirm">
            Confirmar
          </button>
          <button @click="handleCancel" class="btn btn-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useConfirmToast } from '@/composables/useConfirmToast';

const { isVisible, message, handleConfirm, handleCancel } = useConfirmToast();
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.confirm-toast {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-confirm {
  background-color: var(--accent-color);
  color: white;
}

.btn-cancel {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>