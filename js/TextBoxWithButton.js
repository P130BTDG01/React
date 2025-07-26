document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('miCajaTexto');
    input.addEventListener('keypress', function(e) {
        if (/\d/.test(e.key)) {
            e.preventDefault();
        }
    });

    const boton = document.getElementById('miBoton');
    boton.addEventListener('click', async function() {
        const texto = input.value.trim();
        if (texto.length === 0) return;

        // Enviar el texto al backend para convertirlo en audio usando la API de Google
        try {
            const response = await fetch('http://localhost:3000/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto })
            });
            const data = await response.json();
            const audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
            audio.play();
        } catch (err) {
            alert('No se pudo convertir el texto a voz');
        }
    });
});

