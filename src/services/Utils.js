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