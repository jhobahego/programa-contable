import { showWarningToast } from './toastService';

export function aplicarDescuento(tipoDescuento, contador, salario, salarioPorDescontar, ocultarDescuentoPension, ocultarDescuentoSalud) {
  if (contador.value === 1) {
    showWarningToast(`Ya has descontado la ${tipoDescuento}`); // Use warning toast
    return;
  }

  if (confirm(`¿Seguro quieres descontar el 4% de la ${tipoDescuento} del salario?`)) {
    if (tipoDescuento === "salud") {
      ocultarDescuentoSalud.value = true;
    } else {
      ocultarDescuentoPension.value = true;
    }
    contador.value++;
    salario.value -= salarioPorDescontar;
  } else {
    // Optional: Show a toast if the user cancels
    // showInfoToast("Descuento cancelado");
  }

  // Removed redundant salary subtraction outside confirm block
}


export function validarFormulario({ empleado }) {
  let isValid = true;
  let errors = {
    nombres: '',
    numCedula: '',
    salario: ''
  };

  const { nombres, num_cedula, salario } = empleado;

  if (nombres.trim().length < 3) {
    errors.nombres = 'El nombre debe tener al menos 3 caracteres';
    isValid = false;
  }
  
  if (num_cedula == null) {
    errors.numCedula = 'La cédula es requerida';
    isValid = false;
  }

  if (salario <= 0) {
    errors.salario = 'El salario debe ser mayor a 0';
    isValid = false;
  }

  if (salario == null) {
    errors.salario = 'El salario es requerido';
    isValid = false;
  }

  return {
    isValid,
    errors
  };
}