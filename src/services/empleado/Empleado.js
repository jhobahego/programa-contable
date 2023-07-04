export async function obtenerEmpleado(id) {
  try {
    const respuesta = await fetch(`https://backend-etica.onrender.com/empleados/${id}`)
    if (!respuesta.ok) return;

    const empleado = await respuesta.json();
    return empleado;
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarSalario(id, nuevoEmpleado) {
  try {
    const respuesta = await fetch(`https://backend-etica.onrender.com/empleados/${id}`, {
      method: "PUT",
      body: JSON.stringify(nuevoEmpleado),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (respuesta.ok) {
      return await respuesta.json();
    }
  } catch (error) {
    console.log(error);
  }
}