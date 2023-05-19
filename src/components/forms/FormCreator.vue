<script setup>
import { ref } from 'vue'

const nombres = ref(null);
const numCedula = ref(null);
const salario = ref(null);

defineProps({
  msg: {
    type: String,
    required: true
  }
})

async function guardarEmpleado() {
  const empleado = {
    nombres: nombres.value,
    num_cedula: numCedula.value,
    salario: salario.value
  }

  try {
    const respuesta = await fetch("https://backend-etica.onrender.com/empleados", {
      method: "POST",
      body: JSON.stringify(empleado),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (!respuesta.ok) return;
    alert("usuario creado correctamente");
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <h1 class="title">{{ msg }}</h1>
  <article class="form__container">
    <h3 class="form__title">¿Quien es usted?</h3>
    <form @submit.prevent="guardarEmpleado()" class="form">
      <label>
        Ingrese su nombre:
        <input class="form__input" type="text" placeholder="jhon bairo" v-model="nombres">
      </label>
      <label>
        Ingrese su cedula:
        <input class="form__input" type="text" placeholder="1002667412" v-model="numCedula">
      </label>
      <label>
        Ingrese su salario:
        <input class="form__input" type="number" placeholder="1002667412" v-model="salario">
      </label>
      <button class="form__button">Guardar datos</button>
    </form>
  </article>
</template>

<style>
@import url(form.css);
</style>