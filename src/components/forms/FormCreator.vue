<script setup>
import { ref } from 'vue'
import { crearEmpleado } from '@/services/empleado/Empleado';
import { useRouter } from 'vue-router';
import { validarFormulario } from '@/services/Utils';

const router = useRouter();

const nombres = ref("");
const numCedula = ref(null);
const salario = ref(null);

const errores = ref({
  nombres: "",
  numCedula: "",
  salario: ""
});

async function guardarEmpleado() {
  const empleado = {
    nombres: nombres.value,
    num_cedula: numCedula.value,
    salario: salario.value
  }

  const { isValid, errors } = validarFormulario({ empleado });

  if (!isValid) {
    errores.value = errors;
    return;
  }

  const nuevoEmpleado = await crearEmpleado({...empleado, salario: Number(salario.value)});
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
            :class="{ 'error': errores.nombres }"
            type="text" 
            placeholder="John Doe" 
            v-model="nombres"
          >
          <small v-if="errores.nombres" class="error-text">
            {{ errores.nombres }}
          </small>
        </div>

        <div class="form-group">
          <label>Número de cédula</label>
          <input 
            class="form-control"
            :class="{ 'error': errores.numCedula }"
            type="number" 
            placeholder="1002667412" 
            v-model="numCedula"
          >
          <small v-if="errores.numCedula" class="error-text">
            {{ errores.numCedula }}
          </small>
        </div>

        <div class="form-group">
          <label>Salario base</label>
          <input 
            class="form-control"
            :class="{ 'error': errores.salario }"
            type="number" 
            placeholder="1500000" 
            v-model="salario"
          >
          <small v-if="errores.salario" class="error-text">
            {{ errores.salario }}
          </small>
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

.form-control.error {
  border-color: #dc3545;
}

.error-text {
  color: #dc3545;
  font-size: 14px;
  margin-top: 40px;
}
</style>