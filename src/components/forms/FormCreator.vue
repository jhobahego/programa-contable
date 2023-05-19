<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h1 class="title">{{ msg }}</h1>
  <article class="form__container">
    <h3 class="form__title">¿Quien es usted?</h3>
    <form class="form">
      <label>
        Ingrese su nombre:
        <input class="form__input" type="text" placeholder="jhon bairo">
      </label>
      <label>
        Ingrese su cedula:
        <input class="form__input" type="text" placeholder="1002667412">
      </label>
      <label>
        Ingrese su salario:
        <input class="form__input" type="number" placeholder="1002667412">
      </label>
      <button class="form__button">Guardar datos</button>
    </form>
  </article>
</template>

<style>
@import url(form.css);
</style>