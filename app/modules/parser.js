'use strict'
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const fsPromise = require('./fsPromise');

// Filter out empty lines
const removeEmptyLines = (lines) => {
  return _.filter(lines, line => line.length > 0);
}

function parseMutationLog(logData) {
  let mutantStr = logData[0];
  let killedStr = logData[1];

  let parsedArray = [];
  let killedArr = removeEmptyLines(killedStr.split('\n'));

  for (let line of mutantStr.split('\n')) {
    if (line === "") {
      break;
    }

    let lineArr = line.split(':');
    let codeChange = lineArr[6].split(" |==> ");

    // Find the line in killed.csv that matches the current mutant
    let killedLine = _.find(killedArr, killed => {
      return parseInt(killed.split(',')[0]) === parseInt(lineArr[0]);
    });

    let mutantStatus = killedLine ? killedLine.split(',')[1] : 'UNDETECTED';
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
      'killed' : mutantStatus === 'FAIL'
    });
  }

  return parsedArray;
}

const getClassPaths = (mutantLog) => {
  return _.map(mutantLog, line => {
    // $ exists before @
    if (line.indexOf('$') > -1 && line.indexOf('$') < line.indexOf('@')) {
      return line.split(':')[4].split('$')[0];
    }
    // $ exists, but not @
    else if (line.indexOf('$') > -1 && line.indexOf('@') < 0) {
      return line.split(':')[4].split('$')[0];
    }

    // @ only exists
    return line.split(':')[4].split('@')[0];
  });
};

// Find the mutant ids that belong to this classpath
const getMutantIds = (mutantLog, classPath) => {
  let mutantIds = [];
  _.each(mutantLog, line => {
    if (line.indexOf(classPath) > -1) {
      mutantIds.push(line.split(':')[0]);
    }
  });

  return mutantIds;
};

const createDictionary = (mutantLog, baseSrcDir) => {
  // Ignore empty lines that may occur at the end of the file
  let filteredMutantLog = removeEmptyLines(mutantLog.split('\n'));

  // Get the unique classplaths from the mutants log file
  let classPaths = _.uniq(getClassPaths(filteredMutantLog));

  let dictionary = {};
  let finalPromise;

  _.each(classPaths, classPath => {
    let filePath = classPath.replace(/\./g, '/') + '.java';
    let fullPath = path.resolve(baseSrcDir, filePath);

    finalPromise = fsPromise.readFile(fullPath).then(data => {
      _.set(dictionary, classPath, {
        text: data,
        mutants: getMutantIds(filteredMutantLog, classPath)
      });

      return dictionary;
    });
  });

  return finalPromise;
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

  let dictionary = logs.then(data => {
    return createDictionary(data[0], dirs.source);
  });

  return Promise.all([logs, dictionary]).then(data => {
    return {
      parsedMutations: parseMutationLog(data[0]),
      dictionary: data[1]
    };
  });
};

const test = (dirs) => {
  let logs = loadLogs(dirs.mutation).then(data => {
    return data;
  });

  let dictionary = logs.then(data => {
    return createDictionary(data[0], dirs.source);
  });

  return Promise.all([logs, dictionary]).then(data => {
    return {
      parsedMutations: parseMutationLog(data[0]),
      dictionary: data[1]
    };
  });
};