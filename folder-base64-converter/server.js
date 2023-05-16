// app.js
const express = require('express');
const compressRoutes = require('./routes/compressRoutes');

const app = express();

app.use('/', compressRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
