const fs = require('fs-extra');
const path = require('path');

const filePath = path.join(__dirname, '../data/phoneList.json');

const getPhoneList = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

module.exports = {
  getPhoneList,
};
