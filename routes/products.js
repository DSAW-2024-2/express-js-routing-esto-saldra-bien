const express = require('express');
const router = express.Router();

let products = [
  // Ejemplo de productos iniciales
  { id: '1', name: 'Laptop', price: 1000, category: 'Electronico' },
  { id: '2', name: 'Phone', price: 500, category: 'Electronico' },
];

// GET /products: Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

// POST /products: Crear un nuevo producto
router.post('/', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET /products/:id: Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

// PUT /products/:id: Actualizar un producto existente
router.put('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex !== -1) {
    products[productIndex] = req.body;
    res.json(products[productIndex]);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

// DELETE /products/:id: Eliminar un producto
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

module.exports = router;
