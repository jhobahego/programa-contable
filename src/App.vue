<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import ToastContainer from './components/toast/ToastContainer.vue';
import ConfirmToast from './components/toast/ConfirmToast.vue'

const { isDark, toggleTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="company-name">FinanzApp</h1>
        <button class="theme-toggle" @click="toggleTheme">
          {{ isDark ? '🌞' : '🌙' }}
        </button>
      </div>
      <nav class="sidebar-nav">
        <RouterLink class="nav-link" to="/">Dashboard</RouterLink>
        <RouterLink class="nav-link" to="/empleados">Empleados</RouterLink>
        <RouterLink class="nav-link" to="/registro">Registrar Empleado</RouterLink>
      </nav>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>

    <ToastContainer />
    <ConfirmToast />
  </div>
</template>

<style>
@import url(app.css);

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.company-name {
  font-size: 1.5rem;
  color: var(--accent-color);
  font-weight: 600;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.theme-toggle:hover {
  background-color: var(--bg-primary);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: var(--accent-color);
  color: white;
}
</style>