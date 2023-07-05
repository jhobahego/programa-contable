<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const empleados = ref(null)

const router = useRouter();

function irADescontar(cedula) {
	router.push(`/empleados/${cedula}`);
}

function filtrarUsuarios(usuarios) {
	console.log(usuarios);
	return usuarios.filter(usuario => usuario.pension_descontada === false || usuario.salud_descontada === false);
}

onMounted(async () => {
	try {
		const respuesta = await fetch("https://backend-etica.onrender.com/empleados");
		if (!respuesta.ok) return;

		const usuarios = await respuesta.json();

		empleados.value = filtrarUsuarios(usuarios);
	} catch (error) {
		console.log(error);
	}
})

</script>

<template>
	<main>
		<div class="noresults" v-if="empleados?.length === 0">
			<p>No hay empleados registrados</p>
			<RouterLink class="empleados__link" to="/">Registrar empleado</RouterLink>
		</div>
		<section class="card__container" v-else>
			<article class="card__empleados" v-for="empleado in empleados" :key="empleado._id">
				<div class="card__info">
					<h4 class="card__name">nombres: {{ empleado.nombres }}</h4>
					<p class="card__description">numero de cedula: {{ empleado.num_cedula }}</p>
					<p class="card__description">salario: {{ empleado.salario }}</p>
					<button class="card__btn" @click="irADescontar(empleado.num_cedula)" >Descontar salario</button>
				</div>
			</article>
		</section>
	</main>
</template>

<style>
@import url(empleado.css);
</style>