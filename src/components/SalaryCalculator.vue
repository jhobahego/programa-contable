<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <article>
    <h1>{{ msg }}</h1>
    <h3>¿Quien es usted?</h3>
    <form>
      <label>
        Ingrese su nombre:
        <input type="text" placeholder="jhon bairo">
      </label>
      <label>
        Ingrese su cedula:
        <input type="text" placeholder="1002667412">
      </label>
      <label>
        Ingrese su salario:
        <input type="number" placeholder="1002667412">
      </label>
      <button>Calcular</button>
    </form>
  </article>
</template>
