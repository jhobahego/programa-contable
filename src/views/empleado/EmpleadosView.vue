<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { obtenerEmpleados } from '@/services/empleado/Empleado';

const empleados = ref(null);
const filtroEstado = ref('todos');
const busqueda = ref('');

const router = useRouter();

function irADescontar(cedula) {
  router.push(`/empleados/${cedula}`);
}

function filtrarEmpleados() {
  if (!empleados.value) return [];
  
  return empleados.value
    .filter(emp => {
      const matchBusqueda = emp.nombres.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                           emp.num_cedula.includes(busqueda.value);
      
      if (filtroEstado.value === 'todos') return matchBusqueda;
      if (filtroEstado.value === 'pendientes') {
        return matchBusqueda && (!emp.pension_descontada || !emp.salud_descontada);
      }
      return matchBusqueda && emp.pension_descontada && emp.salud_descontada;
    });
}

onMounted(async () => {
  const data = await obtenerEmpleados();
  if (!data) {
    router.push("/");
    return;
  }
  empleados.value = data;
});
</script>

<template>
  <div class="empleados-view">
    <div class="page-header">
      <h1 class="page-title">Gestión de Empleados</h1>
      <div class="filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="busqueda" 
            placeholder="Buscar por nombre o cédula..."
            class="form-control"
          >
        </div>
        <select v-model="filtroEstado" class="form-control">
          <option value="todos">Todos los estados</option>
          <option value="pendientes">Pendientes</option>
          <option value="completados">Completados</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table v-if="empleados?.length">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Salario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in filtrarEmpleados()" :key="empleado._id">
              <td>{{ empleado.nombres }}</td>
              <td>{{ empleado.num_cedula }}</td>
              <td>$ {{ empleado.salario.toLocaleString() }}</td>
              <td>
                <span class="status" :class="{
                  'status-complete': empleado.pension_descontada && empleado.salud_descontada,
                  'status-pending': !empleado.pension_descontada || !empleado.salud_descontada
                }">
                  {{ empleado.pension_descontada && empleado.salud_descontada ? 'Completo' : 'Pendiente' }}
                </span>
              </td>
              <td>
                <button 
                  @click="irADescontar(empleado.num_cedula)"
                  class="btn btn-primary"
                  :disabled="empleado.pension_descontada && empleado.salud_descontada"
                >
                  Gestionar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else-if="empleados?.length === 0" class="no-results">
          <p>No hay empleados registrados</p>
          <RouterLink to="/registro" class="btn btn-primary">Registrar empleado</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(empleado.css);
</style>