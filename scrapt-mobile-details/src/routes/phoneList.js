// routes/phoneList.js
const express = require('express');
const router = express.Router();
const PhoneListController = require('../controllers/PhoneListController');

router.get('/', PhoneListController.getPhoneList);

module.exports = router;
