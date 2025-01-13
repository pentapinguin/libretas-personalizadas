// Deshabilita el clic derecho en todo el documento
document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        alert('La descarga de esta imagen está deshabilitada.');
    }
});

// Evita el arrastre de imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Mostrar/ocultar los campos de tamaño personalizado
document.querySelectorAll('input[name="size"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        if (document.getElementById('personalizado').checked) {
            document.getElementById('personalizadoSize').style.display = 'block';
        } else {
            document.getElementById('personalizadoSize').style.display = 'none';
            // Limpiar valores
            document.getElementById('altura').value = '';
            document.getElementById('base').value = '';
        }
    });
});

// Validación de los valores de altura y base
document.querySelectorAll('#altura, #base').forEach((input) => {
    input.addEventListener('input', function () {
        const altura = parseInt(document.getElementById('altura').value);
        const base = parseInt(document.getElementById('base').value);

        // Validar que los valores sean menores a 48 (altura) y 33 (base)
        if (altura >= 49 || base >= 34) {
            document.getElementById('submitinfo').disabled = true;
            // Mostrar popup de error
            document.getElementById('errorPopup').style.display = 'flex';
        } else {
            document.getElementById('submitinfo').disabled = false;
            // Ocultar el popup de error si los valores son correctos
            document.getElementById('errorPopup').style.display = 'none';
        }
    });
});

// Cerrar el popup de error
document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('errorPopup').style.display = 'none';
});

// Mostrar/ocultar los campos de Hojas Personalizadas y Hojas Cuadros
document.querySelectorAll('input[name="contenido"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        // Hojas Personalizadas
        if (document.getElementById('hojasperson').checked) {
            document.getElementById('textarea-personalizado').style.display = 'block';
        } else {
            document.getElementById('textarea-personalizado').style.display = 'none';
        }

        // Hojas Cuadros
        if (document.getElementById('hojascuadros').checked) {
            document.getElementById('select-cuadros').style.display = 'block';
        } else {
            document.getElementById('select-cuadros').style.display = 'none';
        }
    });
});

// Cambiar el value del radio de hojas de cuadros según el select
document.getElementById('tipoCuadro').addEventListener('change', function () {
    const selectedValue = this.value;
    const radioCuadros = document.getElementById('hojascuadros');

    // Actualizamos el value del radio de hojas cuadros
    radioCuadros.value = selectedValue;
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitinfo');

    submitButton.addEventListener('click', function() {
        // Recopilar valores de los formularios
        const pasta = document.querySelector('input[name="pasta"]:checked')?.value || '';
        const lomo = document.querySelector('input[name="lomo"]:checked')?.value || '';
        const size = document.querySelector('input[name="size"]:checked')?.value || '';
        const altura = document.getElementById('altura')?.value || '';
        const base = document.getElementById('base')?.value || '';
        const contenido = document.querySelector('input[name="contenido"]:checked')?.value || '';
        const detalle = document.getElementById('textarea-personalizado')?.value || '';
        const numhojas = document.getElementById('numhojas')?.value || '';
        const imprfteyvta = document.getElementById('imprfteyvta')?.value || '';

        // Validar campos obligatorios
        let valid = true;
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                valid = false;
                field.closest('.card').classList.add('error');
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                field.closest('.card').classList.remove('error');
            }
        });

        if (size === 'personalizado' && (!altura || !base)) {
            valid = false;
            document.getElementById('personalizadoSize').classList.add('error');
            document.getElementById('personalizadoSize').scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            document.getElementById('personalizadoSize').classList.remove('error');
        }

        if (contenido === 'hojasperson' && !detalle) {
            valid = false;
            document.getElementById('textarea-personalizado').classList.add('error');
            document.getElementById('textarea-personalizado').scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            document.getElementById('textarea-personalizado').classList.remove('error');
        }

        if (!numhojas) {
            valid = false;
            document.getElementById('numhojas').closest('.card').classList.add('error');
            document.getElementById('numhojas').scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            document.getElementById('numhojas').closest('.card').classList.remove('error');
        }

        if (!valid) {
            return;
        }

        // Construir el mensaje
        let message = `Hola, me gustaría personalizar una libreta con las siguientes especificaciones:\n\n`;
        message += `Grosor de la Pasta: ${pasta}\n`;
        message += `Tipo de Lomo: ${lomo}\n`;
        message += `Tamaño: ${size}\n`;
        if (size === 'personalizado') {
            message += `Altura: ${altura} cm\n`;
            message += `Base: ${base} cm\n`;
        }
        message += `Contenido: ${contenido}\n`;
        if (contenido === 'hojasperson') {
            message += `Detalle: ${detalle}\n`;
        }
        message += `Número de Hojas: ${numhojas}\n`;
        message += `Impresión: ${imprfteyvta}\n`;

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);

        // Construir el enlace de WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=+525614847163&text=${encodedMessage}`;

        // Redirigir a WhatsApp
        window.open(whatsappLink, '_blank');
    });

    // Habilitar el botón de envío cuando todos los campos requeridos estén completos
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            const allFilled = Array.from(requiredFields).every(input => input.value);
            const size = document.querySelector('input[name="size"]:checked')?.value || '';
            const contenido = document.querySelector('input[name="contenido"]:checked')?.value || '';
            const altura = document.getElementById('altura')?.value || '';
            const base = document.getElementById('base')?.value || '';
            const detalle = document.getElementById('textarea-personalizado')?.value || '';
            const numhojas = document.getElementById('numhojas')?.value || '';

            if (allFilled && (size !== 'personalizado' || (altura && base)) && (contenido !== 'hojasperson' || detalle) && numhojas) {
                submitButton.disabled = false;
                submitButton.classList.add('enabled');
            } else {
                submitButton.disabled = true;
                submitButton.classList.remove('enabled');
            }
        });
    });

    // Validación de los valores de altura y base
    document.querySelectorAll('#altura, #base').forEach((input) => {
        input.addEventListener('input', function () {
            const altura = parseInt(document.getElementById('altura').value);
            const base = parseInt(document.getElementById('base').value);

            // Validar que los valores sean menores a 48 (altura) y 33 (base)
            if (altura >= 49 || base >= 34) {
                submitButton.disabled = true;
                submitButton.classList.remove('enabled');
                // Mostrar popup de error
                document.getElementById('errorPopup').style.display = 'flex';
            } else {
                submitButton.disabled = false;
                submitButton.classList.add('enabled');
                // Ocultar el popup de error si los valores son correctos
                document.getElementById('errorPopup').style.display = 'none';
            }

            // Actualizar el valor del radio personalizado
            if (document.getElementById('personalizado').checked) {
                document.getElementById('personalizado').value = `Altura ${altura} x Base ${base} cm`;
            }
        });
    });

    // Cerrar el popup de error
    document.getElementById('closePopup').addEventListener('click', function () {
        document.getElementById('errorPopup').style.display = 'none';
    });

    // Mostrar/ocultar los campos de tamaño personalizado
    document.querySelectorAll('input[name="size"]').forEach((radio) => {
        radio.addEventListener('change', function () {
            if (document.getElementById('personalizado').checked) {
                document.getElementById('personalizadoSize').style.display = 'block';
            } else {
                document.getElementById('personalizadoSize').style.display = 'none';
                // Limpiar valores
                document.getElementById('altura').value = '';
                document.getElementById('base').value = '';
            }
            // Habilitar el botón si se selecciona cualquier otro tamaño
            if (['Carta', 'mediaCarta', 'cuartoCarta', 'frances'].includes(radio.value)) {
                submitButton.disabled = false;
                submitButton.classList.add('enabled');
            }
        });
    });

    // Mostrar/ocultar los campos de Hojas Personalizadas y Hojas Cuadros
    document.querySelectorAll('input[name="contenido"]').forEach((radio) => {
        radio.addEventListener('change', function () {
            // Hojas Personalizadas
            if (document.getElementById('hojasperson').checked) {
                document.getElementById('textarea-personalizado').style.display = 'block';
            } else {
                document.getElementById('textarea-personalizado').style.display = 'none';
                // Limpiar valores
                document.getElementById('textarea-personalizado').value = '';
            }

            // Hojas Cuadros
            if (document.getElementById('hojascuadros').checked) {
                document.getElementById('select-cuadros').style.display = 'block';
            } else {
                document.getElementById('select-cuadros').style.display = 'none';
            }
        });
    });

    // Cambiar el value del radio de hojas de cuadros según el select
    document.getElementById('tipoCuadro').addEventListener('change', function () {
        const selectedValue = this.value;
        const radioCuadros = document.getElementById('hojascuadros');

        // Actualizamos el value del radio de hojas cuadros
        radioCuadros.value = selectedValue;
    });
});