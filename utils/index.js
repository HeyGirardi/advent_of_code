const fs = require('fs');

module.exports.readFile = async function (dir, file, separator){
    return new Promise((resolve, reject) => {
        fs.readFile(`${dir}/${file}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.replaceAll('\r', '').split(separator));
            };
        });
    });
}
