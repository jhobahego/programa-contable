<template>
  <div class="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <router-link to="/" class="btn-home">Volver al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
}

.not-found h1 {
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: #2980b9;
}
</style>
