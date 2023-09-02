// app.js or index.js
const express = require('express');
const app = express();

// Add middleware, if needed

// Include the phoneList route
const phoneListRoute = require('./src/routes/phoneList');
app.use('/phoneList', phoneListRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
