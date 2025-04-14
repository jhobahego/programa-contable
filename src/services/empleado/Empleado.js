import { showSuccessToast, showErrorToast } from "@/services/toastService";
import { mapFields, messages } from "@/services/Utils";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerEmpleados() {
  try {
    const respuesta = await fetch(`${API_URL}/empleados`)
    const { ok, status } = respuesta;
    if (!ok) {
      if (status === 401) {
        showErrorToast("No tienes permiso para acceder a esta información.");
      } else {
        showErrorToast("Error al obtener la lista de empleados.");
      }
      return [];
    }

    return await respuesta.json();
  } catch (error) {
    showErrorToast("Error de red al obtener empleados. Intenta nuevamente.");
    return [];
  }
}

export async function obtenerEmpleado(id) {
  try {
    const respuesta = await fetch(`${API_URL}/empleados/${id}`)
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        showErrorToast("Empleado no encontrado.");
      } else {
        showErrorToast("Error al cargar los datos del empleado.");
      }
      return null;
    }

    const empleado = await respuesta.json();
    return empleado;
  } catch (error) {
    showErrorToast("Error de red al obtener empleado. Intenta nuevamente.");
    return null;
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
      if (respuesta.status === 422) { // Validation Error based on OpenAPI of backend
        const errorData = await respuesta.json().catch(() => null);
        const input = errorData?.detail?.[0]?.loc?.[1] || "input";
        const detail = errorData?.detail?.[0]?.msg || "Datos inválidos. Verifica la información.";

        const message = messages[detail] || detail;
        const campo = mapFields[input] || input;
        showErrorToast(`${campo}: ${message}`);
      } else {
        showErrorToast("Error al registrar el empleado. Código: " + respuesta.status);
      }
      return null;
    }

    showSuccessToast("Empleado registrado correctamente");

    return await respuesta.json();
  } catch (error) {
    showErrorToast("Error de red al registrar empleado. Intenta nuevamente.");
    return null;
  }
}

export async function actualizarSalario(id, nuevoEmpleado) {
  try {
    const respuesta = await fetch(`${API_URL}/empleados/${id}`, {
      method: "PUT",
      body: JSON.stringify(nuevoEmpleado),
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      }
    })

    if (!respuesta.ok) {
      if (respuesta.status === 422) { // Validation Error based on OpenAPI of backend
        const errorData = await respuesta.json().catch(() => null);
        const detail = errorData?.detail?.[0]?.msg || "Datos inválidos para actualizar.";
        showErrorToast(`Error de validación: ${detail}`);
      } else if (respuesta.status === 404) {
        showErrorToast("Empleado no encontrado para actualizar.");
      }
      else {
        showErrorToast("Error al actualizar los datos del empleado. Código: " + respuesta.status);
      }
      return null;
    }

    showSuccessToast("Datos del empleado actualizados correctamente");

    return await respuesta.json();
  } catch (error) {
    showErrorToast("Error de red al actualizar empleado. Intenta nuevamente.");
    return null;
  }
}