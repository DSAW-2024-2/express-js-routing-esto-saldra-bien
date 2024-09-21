const express = require('express');
const router = express.Router();
const fs = require('fs');

// Cargar datos desde data.json
let data = JSON.parse(fs.readFileSync('data.json'));

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(data.usuarios);
});

// Agregar un nuevo usuario
router.post('/', (req, res) => {
  const newUser = req.body; 
  data.usuarios.push(newUser);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
  res.status(201).json(newUser);
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const user = data.usuarios.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

// Actualizar un usuario existente
router.put('/:id', (req, res) => {
  const userIndex = data.usuarios.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    data.usuarios[userIndex] = { ...data.usuarios[userIndex], ...req.body };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
    res.json(data.usuarios[userIndex]);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const userIndex = data.usuarios.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    data.usuarios.splice(userIndex, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

module.exports = router;
