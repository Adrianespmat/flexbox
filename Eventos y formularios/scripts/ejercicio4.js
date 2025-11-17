window.addEventListener('load', function() {
    const formulario = document.getElementById('miFormulario');
    const campoTelefono = document.getElementById('tlfn');
    const areaObservaciones = document.getElementById('observaciones');

    // Verificar que los elementos existen antes de agregar eventos
    if (formulario) {
        formulario.addEventListener('submit', validarFormulario, false);
    } else {
        console.error('No se encontró el formulario con id miFormulario');
    }

    if (campoTelefono) {
        campoTelefono.addEventListener('keypress', validarNumeros, false);
    } else {
        console.error('No se encontró el campo teléfono con id tlfn');
    }

    if (areaObservaciones) {
        areaObservaciones.addEventListener('input', function() {
            const charCount = this.value.length;
            const charCountElement = document.getElementById('charCount');
            if (charCountElement) {
                charCountElement.textContent = charCount;
            }
        });
    } else {
        console.error('No se encontró el área de observaciones con id observaciones');
    }
});

function validarNumeros(event) {
    var permitidos = "0123456789";
    var codigoCaracter = event.charCode || event.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);

    // Si no es un número, prevenir la acción por defecto
    if (permitidos.indexOf(caracter) === -1) {
        event.preventDefault();
        return false;
    }
    return true;
}

function validarFormulario(event) {
    event.preventDefault();
    const formulario = event.target;
    let esValido = true;
    const camposFaltantes = [];

    // Validar teléfono - usar el id correcto
    const telefono = document.getElementById('tlfn').value.trim();
    if (!telefono) {
        esValido = false;
        camposFaltantes.push('Teléfono');
    }

    // Validar plan seleccionado
    const planSeleccionado = formulario.querySelector('input[name="prepago"]:checked');
    if (!planSeleccionado) {
        esValido = false;
        camposFaltantes.push('Tipo de plan');
    }

    // Validar compañía
    const compania = formulario.elements.compania ? formulario.elements.compania.value : '';
    if (!compania) {
        esValido = false;
        camposFaltantes.push('Compañía telefónica');
    }

    // Validar observaciones
    const observaciones = document.getElementById('observaciones').value.trim();
    if (!observaciones) {
        esValido = false;
        camposFaltantes.push('Observaciones');
    }

    // Mostrar errores o éxito
    if (!esValido) {
        alert('Faltan los siguientes campos obligatorios:\n\n- ' + camposFaltantes.join('\n- '));
        return false;
    } else {
        // Mostrar valores del formulario
        const tipoPlan = planSeleccionado.value === 'si' ? 'Prepago Sí' : 'Prepago No';
        const companiaSelect = formulario.elements.compania;
        const companiaTexto = companiaSelect ? companiaSelect.options[companiaSelect.selectedIndex].text : '';

        let mensaje = 'FORMULARIO COMPLETO\n\n';
        mensaje += 'VALORES INTRODUCIDOS:\n\n';
        mensaje += `Teléfono: ${telefono}\n`;
        mensaje += `Tipo de plan: ${tipoPlan}\n`;
        mensaje += `Compañía: ${companiaTexto}\n`;
        mensaje += `Observaciones: ${observaciones}\n`;
        mensaje += `Caracteres usados: ${observaciones.length}/140`;

        alert(mensaje);
        return true;
    }
}