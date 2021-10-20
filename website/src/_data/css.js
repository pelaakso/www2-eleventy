const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', '..', '_site', 'assets');
const assetsFile = path.join(cssDir, 'assets.json');

const jsonStr = fs.readFileSync(assetsFile);
const assetsJson = JSON.parse(jsonStr);

module.exports = {
  mainStylesCss: `/assets/${assetsJson.cssFile}`,
};
