function validarNumeros(event) {
    var permitidos = "0123456789";
    // Obtener la tecla pulsada
    var codigoCaracter = event.charCode || event.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    // Si no se trata de un valor permitido no se escribirá en la caja de texto
    return permitidos.indexOf(caracter) != -1;
}

// Contador de caracteres para el textarea
document.getElementById('observaciones').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').textContent = charCount;
});

// Contador de caracteres para el textarea
document.getElementById('observaciones').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').textContent = charCount;
});

// Captura el evento de envío del formulario
document.getElementById('phoneForm').addEventListener('submit', function(event) {
    // Prevenir envío por defecto
    event.preventDefault();

    // Array para almacenar los campos faltantes
    let camposFaltantes = [];

    // Validar campo de teléfono
    const tlfn = document.getElementById('tlfn').value.trim();
    if (tlfn === '') {
        camposFaltantes.push('Teléfono');
    }

    // Validar radio buttons (prepago)
    const prepagoSelected = document.querySelector('input[name="prepago"]:checked');
    if (!prepagoSelected) {
        camposFaltantes.push('Tipo de plan (prepago)');
    }

    // Validar compañía
    const compania = document.getElementById('compania').value;
    if (compania === '') {
        camposFaltantes.push('Compañía telefónica');
    }

    // Validar observaciones
    const observaciones = document.getElementById('observaciones').value.trim();
    if (observaciones === '') {
        camposFaltantes.push('Observaciones');
    }

    // Los checkboxes son opcionales, no requieren validación

    // Si hay campos faltantes, mostrar alerta y no enviar formulario
    if (camposFaltantes.length > 0) {
        alert('Por favor, completa los siguientes campos:\n\n- ' + camposFaltantes.join('\n- '));
        return false;
    }

    // Si todo está correcto, enviar formulario
    alert('Formulario enviado correctamente');
    // En un caso real, aquí enviarías el formulario:
    // this.submit();
});