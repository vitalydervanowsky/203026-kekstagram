'use strict';

var pictures = null;

var loadPictures = function(address, callback) {
  var scriptEl = document.createElement('script');
  scriptEl.src = address;
  document.body.appendChild(scriptEl);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};

loadPictures('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
  pictures = data;
  console.log(pictures);
});
