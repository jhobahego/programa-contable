<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { actualizarSalario, obtenerEmpleado } from '@/services/empleado/Empleado';
import { aplicarDescuento } from '@/services/Utils';
import { showInfoToast } from '@/services/toastService';

const route = useRoute();
const router = useRouter();

const empleado = ref(null);
const nombres = ref('');
const salario = ref(0);
const salarioInicial = ref(0);

const ocultarDescuentoSalud = ref(false);
const ocultarDescuentoPension = ref(false);

const salarioPorDescontar = computed(() => Math.round((salario.value * 4) / 100));
const totalDescuentos = computed(() => {
  let total = 0;
  if (ocultarDescuentoSalud.value) total += salarioPorDescontar.value;
  if (ocultarDescuentoPension.value) total += salarioPorDescontar.value;
  return total;
});

const contadorSalud = ref(0);
const contadorPension = ref(0);

const descontar = (tipoDescuento) => {
  const contador = tipoDescuento === 'salud' ? contadorSalud : contadorPension;
  const salarioAntes = salario.value;

  aplicarDescuento(
    tipoDescuento,
    contador,
    salario,
    salarioPorDescontar.value,
    ocultarDescuentoPension,
    ocultarDescuentoSalud,
    empleado
  );

  if (salario.value !== salarioAntes) {
    showInfoToast(`Descuento de ${tipoDescuento} aplicado. Nuevo salario temporal: $${salario.value.toLocaleString()}`);
  }
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
  const empleadoBD = await obtenerEmpleado(id);
  if (!empleadoBD) {
    router.push('/empleados');
    return;
  }

  empleado.value = empleadoBD;
  nombres.value = empleado.value.nombres;
  salario.value = empleado.value.salario;
  salarioInicial.value = empleado.value.salario;
  ocultarDescuentoSalud.value = empleado.value.salud_descontada;
  ocultarDescuentoPension.value = empleado.value.pension_descontada;
});
</script>

<template>
  <div class="detail-view">
    <div class="page-header">
      <h1 class="page-title">Gestión de Descuentos</h1>
      <p class="empleado-name">{{ nombres }}</p>
    </div>

    <div class="grid-cards">
      <div class="card info-card">
        <h3>Salario Base</h3>
        <p class="amount">${{ salarioInicial.toLocaleString() }}</p>
      </div>

      <div class="card info-card">
        <h3>Salario Actual</h3>
        <p class="amount">${{ salario.toLocaleString() }}</p>
      </div>

      <div class="card info-card">
        <h3>Total Descuentos</h3>
        <p class="amount text-danger">${{ totalDescuentos.toLocaleString() }}</p>
      </div>
    </div>

    <div class="card">
      <h2 class="section-title">Aplicar Descuentos</h2>
      
      <div class="descuentos-grid">
        <div class="descuento-card" :class="{ 'descuento-aplicado': ocultarDescuentoSalud }">
          <div class="descuento-info">
            <h3>Salud (4%)</h3>
            <p class="descuento-valor">${{ salarioPorDescontar.toLocaleString() }}</p>
          </div>
          <button 
            @click="descontar('salud')" 
            class="btn" 
            :class="ocultarDescuentoSalud ? 'btn-secondary' : 'btn-primary'"
            :disabled="ocultarDescuentoSalud"
          >
            {{ ocultarDescuentoSalud ? 'Aplicado' : 'Aplicar Descuento' }}
          </button>
        </div>

        <div class="descuento-card" :class="{ 'descuento-aplicado': ocultarDescuentoPension }">
          <div class="descuento-info">
            <h3>Pensión (4%)</h3>
            <p class="descuento-valor">${{ salarioPorDescontar.toLocaleString() }}</p>
          </div>
          <button 
            @click="descontar('pension')" 
            class="btn"
            :class="ocultarDescuentoPension ? 'btn-secondary' : 'btn-primary'"
            :disabled="ocultarDescuentoPension"
          >
            {{ ocultarDescuentoPension ? 'Aplicado' : 'Aplicar Descuento' }}
          </button>
        </div>
      </div>

      <div class="actions">
        <button 
          @click="descontarSalario()" 
          class="btn btn-primary"
          :disabled="!ocultarDescuentoPension && !ocultarDescuentoSalud"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(detail.css);
</style>
