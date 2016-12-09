'use strict'
const fs = require('fs');
const path = require('path');
const fsPromise = require('./fsPromise');

function parseMutationLog(logData) {
  let mutantStr = logData[0];
  let killedStr = logData[1];

  let parsedArray = [];
  let killedArr = killedStr.split('\n');

  for (let line of mutantStr.split('\n')) {
    if (line === "") {
      break;
    }

    let lineArr = line.split(':');
    let codeChange = lineArr[6].split(" |==> ");
    let mutantStatus = killedArr[parseInt(lineArr[0]) - 1].split(',')[1];

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

const createDictionary = (mutantLog, baseSrcDir) => {
  let mutantIds = mutantLog.split('\n').map(line => line.split(':')[0]);

  let classPath = mutantLog.split('\n')[0].split(':')[4].split('@')[0];
  let fileDir = classPath.replace('.', '/') + '.java';

  return fsPromise.readFile(path.resolve(baseSrcDir, fileDir)).then(data => {
    let classPaths = classPath.split('.');
    let dictionary = {};
    let parent = dictionary;

    for (let i = 0; i < classPaths.length; ++i) {
      parent[classPaths[i]] = {};
      let child = parent[classPaths[i]];
      parent = child;

      if (i === classPaths.length - 1) {
        parent.text = data;
        parent.mutants = mutantIds;
      }
    }

    return dictionary;
  });
};

function loadLogs(basePath) {
  let mutantPromise = fsPromise.readFile(path.resolve(basePath, 'mutants.log'));
  let killedPromise = fsPromise.readFile(path.resolve(basePath, 'killed.csv'));
  return Promise.all([mutantPromise, killedPromise]);
}

module.exports = function(dirs) {
  let logs = loadLogs(dirs.mutation).then(data => {
    return data;
  });

  let dictionaryPromise = logs.then(data => {
    return createDictionary(data[0], dirs.source);
  });

  return Promise.all([logs, dictionaryPromise]).then(data => {
    return {
      parsedMutations: data[0],
      dictionary: data[1]
    };
  });
};