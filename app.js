const fs = require('fs');

/* 1.- Instanciar Express */
const express = require('express');

/* 2.- Inicializar la función de express */
const app = express();

/* 3.- Middleware */
app.use(express.json());


/* 4.- Crear rutas */

app.get('/usuario', (req, res) => {
    if (req.query) {
        /* Quiero filtrar - Agrego funcionalidad de filtrado */
    }
    if (req.body) {
        /* Quiero hacer otra cosa - Agrego funcionalidad de lo otro */
    }
    /* Obtengo todos los usuarios */
    res.send('Instrucciones')
});

app.get('/usuario/:id', (req, res) => {
    res.send('Instrucciones')
});

app.put('/usuario/:id', (req, res) => {
    /* Enviar por body */
    res.send('Instrucciones')
});

app.delete('/usuario/:id', (req, res) => {
    res.send('Instrucciones')
});

app.get('/', (req, res) => {
    res.send('Instrucciones')
});

app.get('/mensaje', (req, res) => {
    res.send(
        {
            mensaje: 'Hola desde /mensaje'
        }
    )
});

app.get('/ruta/:uno/:dos/:tres/:mas', (req, res) => {
    console.log(req.params.uno)
    const { uno, dos, tres } = req.params
    res.json({
        mensaje: `${uno} ${dos} ${tres}`
    });
});

app.get('/query', (req, res) => {
    console.log(req.query)
    const param1 = req.query.hola || 'No existe ningun parámetro';
    res.json({
        mensaje: `${param1}`
    });
});

app.get('/body', (req, res) => {
    console.log(req.body)
    const param1 = req.body.hola || 'No existe ningun parámetro';
    res.json({
        mensaje: param1
    });
});

app.get('/ruta/:nombre/:apellido', (req, res) => {
    const { nombre, apellido } = req.params
    res.json({
        mensaje: `Hola, ${nombre} ${apellido}`
    });
});

app.get('/archivo', (req, res) => {
    fs.readFile('nombres.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(
                {
                    mensaje: data.split('\n')
                }
            )
        }
    });
});

app.post('/archivo', (req, res) => {
    fs.appendFile('nombres.txt', `\n${req.body.nombre}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send(
                {
                    mensaje: `Se agregó al archivo: ${req.body.nombre}`
                }
            )
        }
    });
});

app.put('/archivo/:mayuscula', (req, res) => {
    /* Leemos archivo */
    fs.readFile('nombres.txt', 'utf8', (err, data) => {
        if (err) {
            res.json({
                error: err.message
            })
        } else {
            /* Obtengo un array de los archivos con split de saltos de línea (\n) */
            const nameArrays = data.split('\n');
            let newNames = [];
            /* Evalúo si el parámetro está en 1 */
            if (+req.params.mayuscula) {
                /* Mapéo el array para convertir todo en mayúsculas */
                newNames = nameArrays.map(el => el.toUpperCase())
            } else {
                /* Mapéo el array para convertir todo en minúsculas */
                newNames = nameArrays.map(el => el.toLowerCase())
            }
            /* Unimos los elementos del array en un solo texto concatenado con saltos de línea (\n) */
            const contenido = newNames.join('\n');

            /* Mandamos a llamar  el writeFile enviandole el nuevo contenido*/
            fs.writeFile('nombres.txt', contenido, (err) => {
                if (err) {
                    res.json({
                        error: err.message
                    })
                } else {
                    res.send(
                        {
                            mensaje: `Se actualizó el archivo a ${+req.params.mayuscula ? 'MAYÚSCULAS' : 'minúsculas'}`
                        }
                    )
                }
            });
        }
    });
});


app.get('/:id', (req, res) => {
    res.send(
        {
            mensaje: `${req.params.id} desde /:id`
        }
    )
});

/* 5.- Iniciar servidor */
app.listen(3000, () => {
    console.log('listening on port 3000');
});