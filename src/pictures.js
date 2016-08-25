'use strict';

var pictures = null;

var createCallback = function(address, callback) {
  var scriptEl = document.createElement('script');
  scriptEl.src = address;
  document.body.appendChild(scriptEl);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};


createCallback('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
  pictures = data;
});

console.log(pictures);
