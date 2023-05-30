export function aplicarDescuento(tipoDescuento, contador, ocultarDescuentoPension, ocultarDescuentoSalud) {
  if (contador.value === 1) {
    alert(`Ya has descontado la ${tipoDescuento}`);
    return;
  }

  if (confirm(`¿Seguro quieres descontar el 4% de la ${tipoDescuento} del salario?`)) {
    if (tipoDescuento === "salud") {
      ocultarDescuentoSalud.value = true;
    } else {
      ocultarDescuentoPension.value = true;
    }
    contador.value++;
  }
}