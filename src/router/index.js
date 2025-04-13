import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpleadosView from '../views/empleado/EmpleadosView.vue'
import DetailView from '../views/empleado/DetailView.vue'
import FormCreator from '../components/forms/FormCreator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: EmpleadosView
    },
    {
      path: '/empleados/:id',
      name: 'detalles',
      component: DetailView
    },
    {
      path: '/registro',
      name: 'registro',
      component: FormCreator
    }
  ]
})

export default router
