<template>
  <div class="toast-container">
    <div class="toasts">
      <TransitionGroup name="toast">
        <!-- El contenido de los toasts será manejado por vue-toastification -->
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
// Vue-toastification maneja los toasts internamente
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9998;
}

.toasts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Animaciones para los toasts */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
