window.onload = () => {
    let form = document.getElementById("form1");
    let nombre = document.getElementById("nombre");
    let nombreError = document.getElementById("errorNombre");
    let email = document.getElementById("mail");
    let emailError = document.getElementById("errorEmail");

    form.addEventListener("submit", (event) => {
        nombreError.textContent = nombre.validationMessage;
        if (!nombre.validity.valid) {
            event.preventDefault();
        }
        emailError.textContent = email.validationMessage;
        if (!email.validity.valid) {
            event.preventDefault();
        }
    });

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Resetear mensajes de error
        document.querySelectorAll('.error').forEach(error => {
            error.style.display = 'none';
        });
        document.getElementById('successMessage').style.display = 'none';

        let esValido = true;

        // Validar nombre (obligatorio)
        const nombre = document.getElementById('nombre').value.trim();
        if (!nombre) {
            document.getElementById('errorNombre').style.display = 'block';
            document.getElementById('nombre').classList.add('invalid-field');
            esValido = false;
        } else {
            document.getElementById('nombre').classList.remove('invalid-field');
        }

        // Validar teléfono (formato: xxx xxx xxx)
        const telefono = document.getElementById('telefono').value.trim();
        const telefonoRegex = /^\d{3} \d{3} \d{3}$/;

        if (!telefono) {
            document.getElementById('errorTelefono').style.display = 'block';
            document.getElementById('errorTelefono').textContent = 'El teléfono es obligatorio';
            document.getElementById('telefono').classList.add('invalid-field');
            esValido = false;
        } else if (!telefonoRegex.test(telefono)) {
            document.getElementById('errorTelefono').style.display = 'block';
            document.getElementById('errorTelefono').textContent = 'Formato incorrecto. Use: xxx xxx xxx (9 dígitos con espacios)';
            document.getElementById('telefono').classList.add('invalid-field');
            esValido = false;
        } else {
            document.getElementById('telefono').classList.remove('invalid-field');
        }

        // Validar email (opcional, pero si se ingresa debe tener formato válido)
        const correo = document.getElementById('correo').value.trim();
        if (correo) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                document.getElementById('errorCorreo').style.display = 'block';
                document.getElementById('correo').classList.add('invalid-field');
                esValido = false;
            } else {
                document.getElementById('correo').classList.remove('invalid-field');
            }
        } else {
            document.getElementById('correo').classList.remove('invalid-field');
        }

        // Si es válido, mostrar éxito
        if (esValido) {
            document.getElementById('successMessage').style.display = 'block';
            // Aquí podrías enviar el formulario con: this.submit();
        }
    });

    // Auto-formatear teléfono mientras se escribe
    document.getElementById('telefono').addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, ''); // Remover no dígitos
        let formattedValue = '';

        // Formatear como xxx xxx xxx
        for (let i = 0; i < value.length; i++) {
            if (i === 3 || i === 6) {
                formattedValue += ' ';
            }
            if (i < 9) { // Máximo 9 dígitos
                formattedValue += value[i];
            }
        }

        event.target.value = formattedValue;

        // Validación en tiempo real
        const telefonoRegex = /^\d{3} \d{3} \d{3}$/;
        if (telefonoRegex.test(formattedValue)) {
            this.classList.remove('invalid-field');
            document.getElementById('errorTelefono').style.display = 'none';
        }
    });

    // Validación en tiempo real para mejorar UX
    document.getElementById('nombre').addEventListener('blur', function() {
        if (!this.value.trim()) {
            document.getElementById('errorNombre').style.display = 'block';
            this.classList.add('invalid-field');
        } else {
            document.getElementById('errorNombre').style.display = 'none';
            this.classList.remove('invalid-field');
        }
    });

    document.getElementById('telefono').addEventListener('blur', function() {
        const telefonoRegex = /^\d{3} \d{3} \d{3}$/;
        if (!this.value.trim()) {
            document.getElementById('errorTelefono').style.display = 'block';
            document.getElementById('errorTelefono').textContent = 'El teléfono es obligatorio';
            this.classList.add('invalid-field');
        } else if (!telefonoRegex.test(this.value)) {
            document.getElementById('errorTelefono').style.display = 'block';
            document.getElementById('errorTelefono').textContent = 'Formato incorrecto. Use: xxx xxx xxx (9 dígitos con espacios)';
            this.classList.add('invalid-field');
        } else {
            document.getElementById('errorTelefono').style.display = 'none';
            this.classList.remove('invalid-field');
        }
    });

    document.getElementById('correo').addEventListener('blur', function() {
        if (this.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                document.getElementById('errorCorreo').style.display = 'block';
                this.classList.add('invalid-field');
            } else {
                document.getElementById('errorCorreo').style.display = 'none';
                this.classList.remove('invalid-field');
            }
        } else {
            document.getElementById('errorCorreo').style.display = 'none';
            this.classList.remove('invalid-field');
        }
    });

    // Estilo adicional para campos inválidos (complementa input:invalid)
    const style = document.createElement('style');
    style.textContent = `
            .invalid-field {
                border: 2px dashed red !important;
            }
        `;
    document.head.appendChild(style);
};