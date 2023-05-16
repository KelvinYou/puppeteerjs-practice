// app.js
const express = require('express');
const compressRoutes = require('./routes/compressRoutes');

const app = express();

const PORT = 3000;

app.use('/', compressRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
