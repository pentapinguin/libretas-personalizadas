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