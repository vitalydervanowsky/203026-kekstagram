'use strict';

define('pictures',
  [
    './load-pictures',
    './get-picture-element'
  ], function(loadPictures, getPictureElement) {
    (function() {
      var picturesContainer = document.querySelector('.pictures');

      loadPictures('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
        var filtersBlock = document.querySelector('.filters');
        filtersBlock.classList.add('hidden');
        var pictures = data;
        pictures.forEach(function(pic) {
          getPictureElement(pic, picturesContainer);
        });

        filtersBlock.classList.remove('hidden');
      });
    })();
  });
