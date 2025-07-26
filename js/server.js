const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const GOOGLE_API_KEY = '';

app.post('/text-to-speech', async (req, res) => {
    const texto = req.body.texto;
    const url = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${GOOGLE_API_KEY}`;
    const payload = {
        input: { text: texto },
        voice: { languageCode: 'es-ES', name: 'es-ES-Standard-A', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' }
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.audioContent) {
            res.json({ audioContent: data.audioContent });
        } else {
            res.status(500).json({ error: 'No se recibió audio de la API', details: data });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en la API de Google', details: err.message });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
// Ya tienes express, body-parser, node-fetch y cors configurados
// Ya tienes la ruta /text-to-speech lista y usando la API de Google TTS