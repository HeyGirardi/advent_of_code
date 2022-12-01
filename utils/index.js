const fs = require('fs');

module.exports.readFile = async function (dir, file){
    return new Promise((resolve, reject) => {
        fs.readFile(`${dir}/${file}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.split('\n'));
            };
        });
    });
}
