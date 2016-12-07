'use strict'
const fs = require('fs');
const path = require('path');

function parseMutationLog(logData) {
  let mutantStr = logData[0];
  let killedStr = logData[1];

  let parsedArray = [];
  let killedArr = killedStr.split('\n');

  for (let line of mutantStr.split('\n')) {
    if (line == "") {
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

const createDictionary = logData => {
  let mutantLog = logData[0];
  let dictionary = {};

  for (let line of mutantLog.split('\n')) {
    if (line === '') {
      break;
    }

    let lineArr = line.split(':');

    let mutantId = lineArr[0];
    let classPath = lineArr[4].split('.');
    let packageName = classPath[0];
    let className = classPath[1].split('@')[0];

    if (!dictionary[packageName]) {
      dictionary[packageName] = {};
    }

    if (!dictionary[packageName][className]) {
      dictionary[packageName][className] = {
        text: '',
        mutants: []
      }
    }

    dictionary[packageName][className].mutants.push(mutantId);
  }

  return dictionary;
};

function loadLogs(basePath) {
    var mutantPromise = new Promise ((resolve, reject) => {
          fs.readFile(path.resolve(basePath, 'mutants.log'), 'utf8', function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data)
            }
          });
        }
    );
    var killedPromise = new Promise ((resolve, reject) => {
          fs.readFile(path.resolve(basePath, 'killed.csv'), 'utf8', function(err, data) {
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
        createDictionary(data);
        resolve(parseMutationLog(data));
      }).catch((err) => {
        reject(err);
      });
    }
  )
}