const express = require('express');
const router = express.Router();

let users = [
  // Ejemplo de usuarios iniciales
  { id: '1', name: 'Juan Perez', email: 'juan@example.com', age: 30 },
  { id: '2', name: 'Maria Gomez', email: 'maria@example.com', age: 25 },
];

// GET /users: Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(users);
});

// POST /users: Crear un nuevo usuario
router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /users/:id: Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

// PUT /users/:id: Actualizar un usuario existente
router.put('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex] = req.body;
    res.json(users[userIndex]);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

// DELETE /users/:id: Eliminar un usuario
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

module.exports = router;
