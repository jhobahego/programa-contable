const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerEmpleado(id) {
  try {
    const respuesta = await fetch(`${API_URL}/empleados/${id}`)
    if (!respuesta.ok) return;

    const empleado = await respuesta.json();
    return empleado;
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarSalario(id, nuevoEmpleado) {
  try {
    const respuesta = await fetch(`${API_URL}/empleados/${id}`, {
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