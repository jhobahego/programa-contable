<template>
  <article class="detail__card">
    <h4 class="detail__title">{{ nombres }}</h4>
    <form class="detail__form">
      <label class="detail__label">
        salario inicial del empleado
        <input type="number" placeholder="1567200" v-model="salarioInicial" readonly>
      </label>
      <label class="detail__label">
        salario actual del empleado
        <input type="number" placeholder="1567200" v-model="salario" readonly>
      </label>

      <strong v-if="!ocultarDescuentoSalud">valor a descontar por salud {{ salarioPorDescontar }}</strong>
      <strong v-if="!ocultarDescuentoPension">valor a descontar por pensión {{ salarioPorDescontar }}</strong>
      <strong v-if="ocultarDescuentoPension && ocultarDescuentoSalud">no se puede descontar más</strong>

      <div class="detail__buttons">
        <button @click.prevent="descontar('salud')" :disabled="ocultarDescuentoSalud">
          Descontar salud
        </button>
        <button @click.prevent="descontar('pension')" :disabled="ocultarDescuentoPension">
          Descontar pensión
        </button>
      </div>
      <button @click.prevent="descontarSalario()" class="button__last">
        Descontar gastos
      </button>
    </form>
  </article>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { actualizarSalario, obtenerEmpleado } from '@/services/empleado/Empleado';
import { aplicarDescuento } from '@/services/Utils';

const route = useRoute();
const router = useRouter();

const empleado = ref(null);
const nombres = ref('');
const salario = ref(0);
const salarioInicial = ref(0)

const ocultarDescuentoSalud = ref(false)
const ocultarDescuentoPension = ref(false)

const salarioPorDescontar = computed(() => Math.round((salario.value * 4) / 100));

const contadorSalud = ref(0)
const contadorPension = ref(0)

const descontar = (tipoDescuento) => {
  const contador = tipoDescuento === 'salud' ? contadorSalud : contadorPension;

  aplicarDescuento(
    tipoDescuento,
    contador,
    salario,
    salarioPorDescontar.value,
    ocultarDescuentoPension,
    ocultarDescuentoSalud,
    empleado
  );
};

const descontarSalario = async () => {
  const nuevoEmpleado = {
    salario: salario.value,
    pension_descontada: ocultarDescuentoPension.value,
    salud_descontada: ocultarDescuentoSalud.value
  };

  const id = empleado.value._id;

  const nuevoSalario = await actualizarSalario(id, nuevoEmpleado);
  if (nuevoSalario) {
    router.push('/empleados');
  }
};

onMounted(async () => {
  const id = route.params.id;
  const empleadobd = await obtenerEmpleado(id);
  console.log(empleadobd);

  empleado.value = empleadobd;
  nombres.value = empleado.value.nombres;
  salario.value = empleado.value.salario;
  salarioInicial.value = empleado.value.salario;
  ocultarDescuentoSalud.value = empleado.value.salud_descontada;
  ocultarDescuentoPension.value = empleado.value.pension_descontada;
});
</script>

<style scoped>
@import url(detail.css);
</style>
