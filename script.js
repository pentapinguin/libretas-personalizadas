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
    // Tamaño personalizado seleccionado
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
            document.getElementById('submitSize').disabled = true;
        }
    });
});

// Habilitar el botón de submit solo si ambos campos tienen valores
document.querySelectorAll('#altura, #base').forEach((input) => {
    input.addEventListener('input', function () {
        const altura = document.getElementById('altura').value;
        const base = document.getElementById('base').value;
        if (altura && base) {
            document.getElementById('submitSize').disabled = false;
        } else {
            document.getElementById('submitSize').disabled = true;
        }
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
            document.getElementById('submitSize').disabled = true;
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
            document.getElementById('submitSize').disabled = true;
            // Mostrar popup de error
            document.getElementById('errorPopup').style.display = 'flex';
        } else {
            document.getElementById('submitSize').disabled = false;
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
