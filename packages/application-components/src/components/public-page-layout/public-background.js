const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, 'public-background.png');
const svgString = fs.readFileSync(pngPath, 'utf8');
const base64String = Buffer.from(svgString).toString('base64');

module.exports = base64String;
