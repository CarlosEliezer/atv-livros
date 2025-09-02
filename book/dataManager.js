const fs = require('fs');
const path = require('path');

function readData() {
   const filePath = path.join(__dirname, '/data.json');

   if (!fs.existsSync(filePath)) {
      return undefined;
   }

   const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   return data;
}

function writeData(data) {
   const filePath = path.join(__dirname, '/data.json');
   fs.writeFileSync(filePath, `[\n ${ data.map((d) => JSON.stringify(d)).join(',\n ') } \n]`);
}

module.exports = { readData, writeData };