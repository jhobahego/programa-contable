<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav class="navbar__container">
      <RouterLink class="navbar__link" to="/">Home</RouterLink>
      <RouterLink class="navbar__link" to="/empleados">Empleados</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import url(app.css);
</style>