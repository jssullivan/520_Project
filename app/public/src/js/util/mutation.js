"use strict";

export const TYPE = {
  CLASS: 'CLASS',
  PACKAGE: 'PACKAGE'
};

export const parseDictionary = (dictionary) => {
  var parsed = [];
  for(var key in dictionary) {
    parseDict(key, dictionary[key], null, parsed)
  }
  return parsed;
};

const parseDict = (key, val, tree, parsed) => {
  let obj = {};

  let isPackage = val.mutants === undefined;
  if(isPackage) {
    obj.type = TYPE.PACKAGE;
  } else {
    obj.type = TYPE.CLASS;
    obj.mutants = val.mutants;
    obj.text = val.text;
  }

  if(tree) tree += `.${key}`;
  else tree = `${key}`;

  obj.name = key;
  obj.tree = tree;

  parsed.push(obj);

  if(isPackage) {
    
    for(var k in val) {
      parseDict(k, val[k], tree, parsed);
    }
  }
};