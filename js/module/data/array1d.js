'use strict';

const Array2D = require('./array2d');

const random = (N, min, max) => {
  return Array2D.random(1, N, min, max)[0];
};

const randomSorted = (N, min, max)=> {
  return Array2D.randomSorted(1, N, min, max)[0];
};

const calculateAverage = arr => arr.reduce( ( accum, current ) => accum + current, 0 ) / arr.length;

const sortBy = (key) => {
  return function (a, b) { return (a[key] > b[key]) ? 1 : (a[key] < b[key]) ? -1 : 0;};
};

module.exports = {
  random,
  randomSorted,
  sortBy,
  calculateAverage
};
