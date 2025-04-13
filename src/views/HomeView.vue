<script setup>
import { ref, onMounted } from 'vue';
import { obtenerEmpleados } from '@/services/empleado/Empleado';

const empleados = ref([]);
const stats = ref({
  totalEmpleados: 0,
  totalSalarios: 0,
  totalDescuentos: 0,
  promedioSalario: 0
});

onMounted(async () => {
  const data = await obtenerEmpleados();
  if (data) {
    empleados.value = data;
    calcularEstadisticas();
  }
});

function calcularEstadisticas() {
  stats.value.totalEmpleados = empleados.value.length;
  stats.value.totalSalarios = empleados.value.reduce((acc, emp) => acc + Number(emp.salario), 0);
  stats.value.promedioSalario = stats.value.totalSalarios / stats.value.totalEmpleados;
  
  // Calcular descuentos totales (4% salud + 4% pensión)
  stats.value.totalDescuentos = empleados.value.reduce((acc, emp) => {
    let descuentos = 0;
    if (emp.salud_descontada) descuentos += emp.salario * 0.04;
    if (emp.pension_descontada) descuentos += emp.salario * 0.04;
    return acc + descuentos;
  }, 0);
}
</script>

<template>
  <div class="dashboard">
    <h1 class="page-title">Dashboard Financiero</h1>
    
    <div class="grid-cards">
      <div class="card stat-card">
        <h3>Total Empleados</h3>
        <p class="stat-number">{{ stats.totalEmpleados }}</p>
      </div>
      
      <div class="card stat-card">
        <h3>Total en Salarios</h3>
        <p class="stat-number">$ {{ stats.totalSalarios.toLocaleString() }}</p>
      </div>
      
      <div class="card stat-card">
        <h3>Descuentos Aplicados</h3>
        <p class="stat-number">$ {{ stats.totalDescuentos.toLocaleString() }}</p>
      </div>
      
      <div class="card stat-card">
        <h3>Salario Promedio</h3>
        <p class="stat-number">$ {{ stats.promedioSalario.toLocaleString() }}</p>
      </div>
    </div>

    <div class="card recent-employees">
      <h2>Empleados Recientes</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Salario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleados.slice(0, 5)" :key="empleado._id">
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  text-align: center;
}

.stat-card h3 {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 600;
  color: var(--accent-color);
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  color: var(--text-secondary);
  font-weight: 600;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.status-complete {
  background-color: var(--success-color);
  color: white;
}

.status-pending {
  background-color: var(--danger-color);
  color: white;
}
</style>
