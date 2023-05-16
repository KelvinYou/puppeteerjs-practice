// app/routes/compressRoutes.js
const express = require('express');
const compressController = require('../controllers/compressController');

const router = express.Router();

router.get('/compress', compressController.compress);
router.get('/decompress', compressController.decompress);

router.get('/encodeBase64', compressController.encodeBase64);
router.get('/decodeBase64', compressController.decodeBase64);

module.exports = router;
