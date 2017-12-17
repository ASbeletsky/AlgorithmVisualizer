'use strict';

const $ = typeof jQuery != 'undefined'? jQuery : require('jquery-browserify');
const RSVP = require('rsvp');
const app = require('../../app');

const {
  ajax,
  extend
} = $;

const defaults = {

};

module.exports = function(url, options = {}) {
  if(app.setIsLoading) app.setIsLoading(true);


  return new RSVP.Promise((resolve, reject) => {
    const callbacks = {
      success(response) {
        if(app.setIsLoading) app.setIsLoading(false);
        resolve(response);
      },
      error(reason) {
        if(app.setIsLoading) app.setIsLoading(false);
        reject(reason);
      }
    };

    const opts = extend({}, defaults, options, callbacks, {
      url
    });

    ajax(opts);
  });
};