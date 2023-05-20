<script setup>
import { onMounted, ref } from 'vue';

const empleados = ref(null)

onMounted(async () => {
    try {
        const respuesta = await fetch("https://backend-etica.onrender.com/empleados");
        if (!respuesta.ok) return;

        empleados.value = await respuesta.json();
        console.log(empleados.value);
    } catch (error) {
        console.log(error);
    }
})

</script>

<template>
    <main>
        <div class="card__container">
            <article class="card__empleados" v-for="empleado in empleados">
                <h3 class="card__title">nombre: {{ empleado.nombres }}</h3>
                <p class="card__description">numero de cedula: {{ empleado.num_cedula }}</p>
                <p class="card__description">salario: {{ empleado.salario }}</p>
            </article>
        </div>

    </main>
</template>