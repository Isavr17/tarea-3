const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let objects = [
    { id: 1, name: 'Objeto 1' },
    { id: 2, name: 'Objeto 2' },
];

// GET todos los objetos
app.get('/objects', (req, res) => {
    res.json(objects);
});

// GET un objeto por ID
app.get('/objects/:id', (req, res) => {
    const object = objects.find(o => o.id === parseInt(req.params.id));
    if (!object) return res.status(404).send('Objeto no encontrado.');
    res.json(object);
});

// POST un nuevo objeto
app.post('/objects', (req, res) => {
    const newObject = {
        id: objects.length + 1,
        name: req.body.name,
    };
    objects.push(newObject);
    res.status(201).json(newObject);
});

// PUT para actualizar un objeto existente
app.put('/objects/:id', (req, res) => {
    const object = objects.find(o => o.id === parseInt(req.params.id));
    if (!object) return res.status(404).send('Objeto no encontrado.');

    object.name = req.body.name;
    res.json(object);
});

// DELETE para eliminar un objeto existente
app.delete('/objects/:id', (req, res) => {
    const objectIndex = objects.findIndex(o => o.id === parseInt(req.params.id));
    if (objectIndex === -1) return res.status(404).send('Objeto no encontrado.');

    const deletedObject = objects.splice(objectIndex, 1);
    res.json(deletedObject);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
