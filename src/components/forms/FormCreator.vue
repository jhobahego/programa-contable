<script setup>
import { ref } from 'vue'
import { crearEmpleado } from '@/services/empleado/Empleado';
import { useRouter } from 'vue-router';

const router = useRouter();

const nombres = ref(null);
const numCedula = ref(null);
const salario = ref(null);

async function guardarEmpleado() {
  if (!nombres.value || !numCedula.value || !salario.value) {
    return;
  }

  const empleado = {
    nombres: nombres.value,
    num_cedula: numCedula.value,
    salario: Number(salario.value),
    pension_descontada: false,
    salud_descontada: false,
  }

  const nuevoEmpleado = await crearEmpleado(empleado);
  if (nuevoEmpleado) {
    router.push("/empleados");
  }
}

</script>

<template>
  <div class="form-page">
    <h1 class="page-title">Registrar empleado</h1>
    <div class="card">
      <form @submit.prevent="guardarEmpleado" class="form">
        <div class="form-group">
          <label>Nombre completo</label>
          <input 
            class="form-control" 
            type="text" 
            placeholder="John Doe" 
            v-model="nombres"
            required
          >
        </div>

        <div class="form-group">
          <label>Número de cédula</label>
          <input 
            class="form-control" 
            type="number" 
            placeholder="1002667412" 
            v-model="numCedula"
            required
          >
        </div>

        <div class="form-group">
          <label>Salario base</label>
          <input 
            class="form-control" 
            type="number" 
            placeholder="1500000" 
            v-model="salario"
            required
          >
        </div>

        <button type="submit" class="btn btn-primary">
          Registrar Empleado
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  max-width: 600px;
  margin: 0 auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.btn {
  margin-top: 1rem;
}
</style>