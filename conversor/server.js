const express = require('express');
const app = express();
const fetch = require('node-fetch'); // Asegúrate de haber instalado el módulo node-fetch

app.get('/convert', async (req, res) => {
    // Lógica para obtener los datos de conversión de moneda y enviar la respuesta
    try {
        // Realizar solicitud a la API externa para obtener los datos de conversión
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();

        // Enviar los datos de conversión de moneda como respuesta
        res.json(data);
    } catch (error) {
        console.error('Hubo un error al obtener los datos de conversión:', error);
        res.status(500).send('Hubo un error al obtener los datos de conversión. Por favor, inténtalo de nuevo más tarde.');
    }
});

// Otro middleware y configuraciones pueden ir aquí

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
