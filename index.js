const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Importar las rutas
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Usar las rutas
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
