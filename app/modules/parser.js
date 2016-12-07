'use strict'
const fs = require('fs');
const path = require('path');
const fsPromise = require('./fsPromise');

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
      'class' : lineArr[4].split("@")[0],
      'method' : lineArr[4].split("@")[1],
      'lineNum' : lineArr[5],
      'from' : codeChange[0],
      'to' : codeChange[1],
      'status' : mutantStatus,
      'killed' : mutantStatus == 'FAIL'
    });
  }
  return parsedArray;
}

function loadLogs(basePath) {
    let mutantPromise = fsPromise.readFile(path.resolve(basePath, 'mutants.log'));
    let killedPromise = fsPromise.readFile(path.resolve(basePath, 'killed.csv'));
    return Promise.all([mutantPromise, killedPromise])
}

module.exports = function (basePath) {
  return loadLogs(basePath).then((data) => {
    return parseMutationLog(data);
  });  
}