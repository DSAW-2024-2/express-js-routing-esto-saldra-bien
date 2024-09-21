const express = require('express');
const router = express.Router();
const fs = require('fs');

// Cargar datos desde data.json
let data = JSON.parse(fs.readFileSync('data.json'));

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(data.productos);
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const newProduct = req.body; 
  data.productos.push(newProduct);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
  res.status(201).json(newProduct);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = data.productos.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
  const productIndex = data.productos.findIndex(p => p.id === req.params.id);
  if (productIndex !== -1) {
    data.productos[productIndex] = { ...data.productos[productIndex], ...req.body };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
    res.json(data.productos[productIndex]);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const productIndex = data.productos.findIndex(p => p.id === req.params.id);
  if (productIndex !== -1) {
    data.productos.splice(productIndex, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Guardar cambios
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

module.exports = router;
