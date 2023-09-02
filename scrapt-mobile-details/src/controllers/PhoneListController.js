// controllers/PhoneListController.js
const PhoneListModel = require('../models/PhoneListModel');

const getPhoneList = (req, res) => {
  const phoneList = PhoneListModel.getPhoneList();
  
  console.log("get phone list");
  res.json(phoneList);
};

module.exports = {
  getPhoneList,
};
