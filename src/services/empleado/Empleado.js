import { showSuccessToast, showErrorToast } from "@/services/toastService";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerEmpleados() {
  try {
    const respuesta = await fetch(`${API_URL}/empleados`)
    if (!respuesta.ok) {
      return [];
    }

    return await respuesta.json();
  } catch (error) {
    showErrorToast("Ha ocurrido un error, intenta nuevamente más tarde");
    console.log(error);
    return [];
  }
}

export async function obtenerEmpleado(id) {
  try {
    const respuesta = await fetch(`${API_URL}/empleados/${id}`)
    if (!respuesta.ok) {
      showErrorToast("Error al cargar el empleado");
      return;
    }

    const empleado = await respuesta.json();
    return empleado;
  } catch (error) {
    showErrorToast("Ha ocurrido un error, intenta nuevamente más tarde");
    console.log(error);
  }
}

export async function crearEmpleado(empleado) {
  console.log({ empleado });
  try {
    const respuesta = await fetch(`${API_URL}/empleados`, {
      method: "POST",
      body: JSON.stringify(empleado),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      }
    })

    if (!respuesta.ok) {
      showErrorToast("Error al registrar el empleado");
      console.log(respuesta);
      return;
    }

    if (respuesta.status === 400) {
      showErrorToast("Datos inválidos");
      return;
    }
    
    showSuccessToast("Empleado registrado correctamente");
    
    return await respuesta.json();
  } catch (error) {
    console.log(error);
    showErrorToast("Ha ocurrido un error, intenta nuevamente más tarde");
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

    if (!respuesta.ok) {
      showErrorToast("Error al actualizar el salario");
      return;
    }

    showSuccessToast("Salario actualizado correctamente");    

    return await respuesta.json();
  } catch (error) {
    showErrorToast("Ha ocurrido un error, intenta nuevamente más tarde");
    console.log(error);
  }
}