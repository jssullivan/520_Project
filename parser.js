'use strict'
const fs = require('fs');

function parseMutationLog(logData) {
  let mutatntStr = logData[0];
  let killedStr = logData[1];

  let parsedArray = [];
  let killedArr = killedStr.split('\n');

  for (let line of mutatntStr.split('\n')) {
    if (line == "")  {
      break;
    }

    let lineArr = line.split(':');
    let codeChange = lineArr[6].split(" |==> ");
    let mutantStatus = killedArr[1 + parseInt(lineArr[0])].split(',')[1];

    parsedArray.push({
      'id' : lineArr[0],
      'type' : lineArr[1],
      'fromDef' : lineArr[2],
      'toDef' : lineArr[3],
      'line' : lineArr[4] + ":" + lineArr[5],
      'from' : codeChange[0],
      'to' : codeChange[1],
      'status' : mutantStatus,
      'killed' : mutantStatus == 'FAIL'
    });
  }
  return parsedArray;
}

function loadLogs(basePath) {
    var mutantPromise = new Promise ((resolve, reject) => {
          fs.readFile(basePath + 'mutants.log', 'utf8', function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data)
            }
          });
        }
    );
    var killedPromise = new Promise ((resolve, reject) => {
          fs.readFile(basePath + 'killed.csv', 'utf8', function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data)
            }
          });
        }
    );
    return Promise.all([mutantPromise, killedPromise])
}

module.exports = function (basePath) {
  return new Promise ((resolve, reject) => {
      loadLogs(basePath).then((data) => {
        resolve(parseMutationLog(data));
      }).catch((err) => {
        reject(err);
      });
    }
  )
}