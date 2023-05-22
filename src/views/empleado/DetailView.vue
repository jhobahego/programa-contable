<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const empleado = ref(null);
const nombres = ref('');
const salario = ref(0);

let contadorSalud = ref(0)
let contadorPension = ref(0)

function descontar(tipoDescuento) {
  if(contadorPension.value > 0 && contadorSalud.value > 0){
    alert(`Ya has descontado la ${tipoDescuento}`);
    return;  
  } 

  if(confirm(`¿Seguro quieres descontar el 4% de la ${tipoDescuento} del salario?`)){
    salario.value -= Math.floor(salario.value * 0.04);
  }

  if(tipoDescuento === "salud"){
    contadorSalud.value++;
  } else {
    contadorPension.value++;
  }
}

async function actualizarSalario() {
  const nuevoEmpleado = {
    salario: salario.value,
  }

  const id = empleado.value._id;

  try {
    const respuesta = await fetch(`https://backend-etica.onrender.com/empleados/${id}`, {
      method: "PUT",
      body: JSON.stringify(nuevoEmpleado),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if(respuesta.ok) {
      router.push("/empleados");
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  const id = route.params.id;

  try {
    const respuesta = await fetch(`https://backend-etica.onrender.com/empleados/${id}`)
    if(!respuesta.ok) return;

    empleado.value = await respuesta.json();
    nombres.value = empleado.value.nombres;
    salario.value = empleado.value.salario;
  } catch (error) {
    console.log(error);
  }
})

</script>

<template>
  <article class="detail__card">
    <h4 class="detail__title">{{ nombres }}</h4>
    <form class="detail__form">
      <label>
        salario:
        <input type="number" placeholder="1567200" v-model="salario">
      </label>

      <div class="detail__buttons">
        <button @click.prevent="descontar('salud')">
          Descontar salud
        </button>
        <button @click.prevent="descontar('pension')">
          Descontar pensión
        </button>
      </div>
      <button @click.prevent="actualizarSalario()" class="button__last">
        Descontar gastos
      </button>
    </form>
  </article>
</template>

<style scoped>
@import url(detail.css);
</style>
