'use strict';

define('pictures',
  [
    './load-pictures',
    './get-picture-element'
  ], function(loadPictures, getPictureElement) {
    // console.log(loadPictures);
    return function() {
      var picturesContainer = document.querySelector('.pictures');
      console.log('111');

      window.loadPictures('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
        var filtersBlock = document.querySelector('.filters');
        filtersBlock.classList.add('hidden');
        var pictures = data;
        // console.log(pictures);
        pictures.forEach(function(pic) {
          window.getPictureElement(pic, picturesContainer);
        });

        filtersBlock.classList.remove('hidden');
      });
    };
  });
