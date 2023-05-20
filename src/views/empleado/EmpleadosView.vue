<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const empleados = ref(null)

const router = useRouter();

function irADescontar(cedula) {
	router.push(`/empleados/${cedula}`);
}

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
		<section class="card__container">
			<article class="card__empleados" v-for="empleado in empleados" :key="empleado._id">
				<h4 class="card__name">nombres: {{ empleado.nombres }}</h4>
				<p class="card__description">numero de cedula: {{ empleado.num_cedula }}</p>
				<p class="card__description">salario: {{ empleado.salario }}</p>
				<button @click="irADescontar(empleado.num_cedula)" >Descontar salario</button>
			</article>
		</section>
	</main>
</template>

<style>
@import url(empleado.css);
</style>