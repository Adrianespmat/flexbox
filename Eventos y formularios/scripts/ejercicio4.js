function validarNumeros(event) {
    var permitidos = "0123456789";
    // Obtener la tecla pulsada
    var codigoCaracter = event.charCode || event.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    // Si no se trata de un valor permitido no se escribirá en la caja de texto
    return permitidos.indexOf(caracter) != -1;
}