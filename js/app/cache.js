'use strict';

const extend = function extend(a, b){
  for(var key in b)
    if(b.hasOwnProperty(key))
      a[key] = b[key];
  return a;
};

const cache = {
  lastFileUsed: '',
  files: {}
};

const assertFileName = (name) => {
  if (!name) {
    throw 'Missing file name';
  }
};

const getCachedFile = function(name) {
    assertFileName(name);
    return cache.files[name];
};

const updateCachedFile = function(name, updates) {
    assertFileName(name);
    if (!cache.files[name]) {
        cache.files[name] = {};
    }
    extend(cache.files[name], updates);
};

const getLastFileUsed = function() {
    return cache.lastFileUsed;
};

const setLastFileUsed = function(file) {
    cache.lastFileUsed = file;
};

/**
 * Global application cache
 */
module.exports = {
    getCachedFile,
    updateCachedFile,
    getLastFileUsed,
    setLastFileUsed
};