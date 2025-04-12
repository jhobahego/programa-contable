<script setup>
import { ref } from 'vue'
import { crearEmpleado } from '@/services/empleado/Empleado';
import { useRouter } from 'vue-router';

const router = useRouter();

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

  const nuevoEmpleado = await crearEmpleado(empleado);
  if (nuevoEmpleado) {
    router.push("/empleados");
  }
}

</script>

<template>
  <h1 class="title">{{ msg }}</h1>
  <article class="form__container">
    <h3 class="form__title">¿Quien es usted?</h3>
    <form @submit.prevent="guardarEmpleado()" class="form">
      <label class="form__label">
        Ingrese su nombre:
        <input class="form__input" type="text" placeholder="jhon bairo" v-model="nombres">
      </label>
      <label class="form__label">
        Ingrese su cedula:
        <input class="form__input" type="number" placeholder="1002667412" v-model="numCedula">
      </label>
      <label class="form__label">
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