const express = require('express');
const router = express.Router();
const fs = require('fs');

// Cargar datos desde data.json
let data = JSON.parse(fs.readFileSync('data.json'));

// Obtener todos los pedidos
router.get('/', (req, res) => {
  res.json(data.pedidos);
});

// Agregar un nuevo pedido
router.post('/', (req, res) => {
  const newOrder = req.body; 
  data.pedidos.push(newOrder);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
  res.status(201).json(newOrder);
});

// Obtener un pedido por ID
router.get('/:id', (req, res) => {
  const order = data.pedidos.find(o => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send({ message: 'Pedido no encontrado' });
  }
});

module.exports = router;
