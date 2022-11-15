const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, 'public-background.png');
const base64String = fs.readFileSync(pngPath).toString('base64');

module.exports = base64String;
exports.default = base64String;
