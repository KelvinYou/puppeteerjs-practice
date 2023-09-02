// app.js
const express = require('express');
const compressRoutes = require('./routes/compressRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

const PORT = 3000;

app.use('/', compressRoutes);
app.use('/product/', productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
