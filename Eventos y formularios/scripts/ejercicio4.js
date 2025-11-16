window.addEventListener('load', function() {
    const formulario = document.getElementById('miFormulario');
    const campoTelefono = document.getElementById('tlfn');
    const areaObservaciones = document.getElementById('observaciones');
    
    //Registrar evento de envío del formulario
    formulario.addEventListener('submit', validarFormulario, false);
    
    //Registrar evento keypress para validar números en teléfono 
    campoTelefono.addEventListener('keypress', validarNumeros, false);
    
    //Contador de caracteres para observaciones
    areaObservaciones.addEventListener('input', function() {
        const charCount = this.value.length;
        document.getElementById('charCount').textContent = charCount;
    });
});



function validarNumeros(event) {  
var permitidos = "0123456789";  // Obtener la tecla pulsada
  var codigoCaracter = event.charCode || event.keyCode;  
  var caracter = String.fromCharCode(codigoCaracter);  
  // Si no se trata de un valor permitido no se escribirá en la caja de texto
    return permitidos.indexOf(caracter) != -1;  }


function validarFormulario(event) {
    
    event.preventDefault();
    
    const formulario = event.target;
    let esValido = true;
    const camposFaltantes = [];
    
    // VALIDACIÓN DE CAMPOS OBLIGATORIOS
    
    //Validar teléfono
    const telefono = formulario.elements.telefono.value.trim();
    if (!telefono) {
        esValido = false;
        camposFaltantes.push('Teléfono');
    }

    //Validar tipo de plan
    const planSeleccionado = formulario.querySelector('input[name="prepago"]:checked');
    if (!planSeleccionado) {
        esValido = false;
        camposFaltantes.push('Tipo de plan');
    }
    
    //Validar compañía
    const compania = formulario.elements.compania.value;
    if (!compania) {
        esValido = false;
        camposFaltantes.push('Compañía telefónica');
    }
    
    //Validar observaciones
    const observaciones = formulario.elements.observaciones.value.trim();
    if (!observaciones) {
        esValido = false;
        camposFaltantes.push('Observaciones');
    }
    
    // Los CHECKBOX de franja horaria NO son obligatorios según el ejercicio
    
    // MOSTRAR RESULTADOS
    if (!esValido) {
        // Campos faltantes - mostrar alert y no enviar
        alert('Faltan los siguientes campos obligatorios:\n\n- ' + camposFaltantes.join('\n- '));
        return false;
    } else {
        // Todo completo - mostrar valores en alert
        mostrarValoresFormulario(formulario);
        return true;
    }
}

function mostrarValoresFormulario(formulario) {
    // Obtener valores de todos los campos
    
    //Teléfono
    const telefono = formulario.elements.telefono.value;
    
    //Franjas horarias solo los seleccionados
    const franjasSeleccionadas = [];
    const checkboxesFranjas = formulario.querySelectorAll('input[name="franjaHoraria"]:checked');
    checkboxesFranjas.forEach(checkbox => {
        // Obtener el texto de la franja horaria
        const textoFranja = checkbox.nextSibling.textContent.trim();
        franjasSeleccionadas.push(textoFranja);
    });
    
    // 3. Tipo de plan (RADIO BUTTON - solo el seleccionado)
    const tipoPlan = formulario.querySelector('input[name="prepago"]:checked');
    const textoPlan = tipoPlan.value === 'si' ? 'Prepago' : 'Contrato';
    
    // 4. Compañía telefónica
    const companiaSelect = formulario.elements.compania;
    const companiaTexto = companiaSelect.options[companiaSelect.selectedIndex].text;
    
    // 5. Observaciones
    const observaciones = formulario.elements.observaciones.value;
    
    // Construir mensaje para el alert
    let mensaje = 'FORMULARIO COMPLETO\n\n';
    mensaje += 'VALORES INTRODUCIDOS:\n\n';
    mensaje += `Teléfono: ${telefono}\n`;
    mensaje += `Franjas horarias seleccionadas: ${franjasSeleccionadas.length > 0 ? franjasSeleccionadas.join(', ') : 'Ninguna'}\n`;
    mensaje += `Tipo de plan: ${textoPlan}\n`;
    mensaje += `Compañía: ${companiaTexto}\n`;
    mensaje += `Observaciones: ${observaciones}\n`;
    mensaje += `Caracteres usados: ${observaciones.length}/140`;
    
    // Mostrar alert con todos los valores
    alert(mensaje);
    
    // Opcional: aquí podrías enviar el formulario realmente si quisieras
    // formulario.submit();
}