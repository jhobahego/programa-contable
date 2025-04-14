import { showWarningToast, showInfoToast } from './toastService';
import { useConfirmToast } from '@/composables/useConfirmToast';

const confirmToast = useConfirmToast();

export async function aplicarDescuento(tipoDescuento, contador, salario, salarioPorDescontar, ocultarDescuentoPension, ocultarDescuentoSalud) {
  if (contador.value === 1) {
    showWarningToast(`Ya has descontado la ${tipoDescuento}`);
    return;
  }

  const confirmed = await confirmToast.showConfirm(`¿Desea descontar el 4% de la ${tipoDescuento} del salario?`);
  
  if (confirmed) {
    if (tipoDescuento === "salud") {
      ocultarDescuentoSalud.value = true;
    } else {
      ocultarDescuentoPension.value = true;
    }
    contador.value++;
    salario.value -= salarioPorDescontar;
    showInfoToast(`Descuento de ${tipoDescuento} aplicado correctamente`);
  } else {
    showInfoToast("Descuento cancelado");
  }
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

export const mapFields = {
  nombres: "Nombre completo",
  num_cedula: "Número de cédula",
  salario: "Salario base",
  hashed_password: "Contraseña"
};

export const messages = {
  "Input should be a valid integer": "El campo debe ser un número entero.",
  "Input should be a valid float": "El campo debe ser un número decimal.",
  "Field required": "Campo requerido",
};