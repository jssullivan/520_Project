'use strict'
const fs = require('fs');

module.exports.readFile = function(filePath) {
      return new Promise ((resolve, reject) => {
          fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data)
            }
          });
        }
    );
}