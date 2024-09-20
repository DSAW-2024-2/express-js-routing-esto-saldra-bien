const express = require('express');
const router = express.Router();

let orders = [
  // Ejemplo de pedidos iniciales
  { id: '1', userId: '1', productId: '2', quantity: 1, status: 'Pending' },
  { id: '2', userId: '2', productId: '1', quantity: 2, status: 'Shipped' },
];

// GET /orders: Obtener todos los pedidos
router.get('/', (req, res) => {
  res.json(orders);
});

// POST /orders: Crear un nuevo pedido
router.post('/', (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// GET /orders/:id: Obtener un pedido por ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send({ message: 'Pedido no encontrado' });
  }
});

module.exports = router;
