'use strict';

define(function() {
  return function(address, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = address;
    document.body.appendChild(scriptEl);
    window.JSONPCallback = function(data) {
      callback(data);
    };
  };
});

// window.loadPictures = (function() {
//   return function(address, callback) {
//     var scriptEl = document.createElement('script');
//     scriptEl.src = address;
//     document.body.appendChild(scriptEl);
//     window.JSONPCallback = function(data) {
//       callback(data);
//     };
//   };
// })();
