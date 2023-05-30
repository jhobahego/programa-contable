<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const empleado = ref(null);
const nombres = ref('');
const salario = ref(0);

const ocultarDescuentoSalud = ref(false)
const ocultarDescuentoPension = ref(false)

const salarioDescontado = computed(() => {
  const descuento = (salario.value * 4) / 100;
  return salario.value - descuento;
});

const salarioPorDescontar = computed(() => (salario.value * 4) / 100);

let contadorSalud = ref(0)
let contadorPension = ref(0)

function descontar(tipoDescuento) {
  const contador = tipoDescuento === "salud" ? contadorSalud : contadorPension;

  if (contador.value === 1) {
    alert(`Ya has descontado la ${tipoDescuento}`);
    return;
  }

  if (confirm(`¿Seguro quieres descontar el 4% de la ${tipoDescuento} del salario?`)) {
    if (tipoDescuento === "salud") {
      ocultarDescuentoSalud.value = true;
    } else {
      ocultarDescuentoPension.value = true;
    }
    contador.value++;
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

    if (respuesta.ok) {
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
    if (!respuesta.ok) return;

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
      <label class="detail__label">
        salario actual del empleado
        <input type="number" placeholder="1567200" v-model="salario" readonly>
      </label>

      <label class="detail__label detail__label--last" v-if="ocultarDescuentoPension | ocultarDescuentoSalud">
        salario con el descuento aplicado
        <input type="number" placeholder="1567200" v-model="salarioDescontado" readonly>
      </label>

      <strong v-if="!ocultarDescuentoSalud">valor a descontar por salud {{ salarioPorDescontar }}</strong>
      <strong v-if="!ocultarDescuentoPension">valor a descontar por pension {{ salarioPorDescontar }}</strong>
      <strong v-if="ocultarDescuentoPension && ocultarDescuentoSalud">no se puede descontar más</strong>

      <div class="detail__buttons">
        <button @click.prevent="descontar('salud')" :disabled="ocultarDescuentoSalud">
          Descontar salud
        </button>
        <button @click.prevent="descontar('pension')" :disabled="ocultarDescuentoPension">
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
