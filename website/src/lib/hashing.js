const fs = require('fs');
const crypto = require('crypto');

async function generateHashOfFiles(files) {
    const hash = crypto.createHash('md5');

    for (const file of files) {
        hash.update(await fs.promises.readFile(file));
    }

    return hash.digest('hex');
};

function generateHashOfFilesSync(files) {
    const hash = crypto.createHash('md5');

    for (const file of files) {
        hash.update(fs.readFileSync(file));
    }

    return hash.digest('hex');
};

function generateHashOfInput(str) {
    return crypto.createHash('md5')
            .update(str)
            .digest('hex');
};

exports.generateHashOfFiles = generateHashOfFiles;
exports.generateHashOfFilesSync = generateHashOfFilesSync;
exports.generateHashOfInput = generateHashOfInput;
