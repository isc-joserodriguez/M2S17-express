/* 1.- Instanciar Express */
const express = require('express');

/* 2.- Inicializar la función de express */
const app = express();

/* 3.- Pendiente */

/* 4.- Crear rutas */

app.get('/ruta', (req, res) => {
    res.send('Hola desde la ruta!!')
});

/* 5.- Iniciar servidor */
app.listen(3000, () => {
    console.log('listening on port 3000');
});