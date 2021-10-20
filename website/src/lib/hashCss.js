const glob = require('fast-glob');
const hashing = require('./hashing');

function hashCssFilesSync(dir) {
    const cssFiles = glob.sync([`${dir}/**/*.css`]);
    return hashing.generateHashOfFilesSync(cssFiles);
};

exports.hashCssFilesSync = hashCssFilesSync;
