'use strict';

define('load',
  function() {
    var getSearchString = function(params) {
      return Object.keys(params).map(function(param) {
        return [param, params[param]].join('=');
      }).join('&');
    };

    return function(address, params, callback) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function(evt) {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      };

      xhr.open('GET', address + '?' + getSearchString(params));

      xhr.send();
    };
  });
