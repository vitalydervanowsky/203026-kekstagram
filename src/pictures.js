'use strict';

define('pictures',
  ['./load', './picture', './gallery'],
  function(load, Picture, gallery) {
    (function() {
      var picturesContainer = document.querySelector('.pictures');

      load('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
        var filtersBlock = document.querySelector('.filters');
        filtersBlock.classList.add('hidden');
        var pictures = data;
        pictures.forEach(function(picData, index) {
          picturesContainer.appendChild(new Picture(picData, index).element);
        });
        filtersBlock.classList.remove('hidden');
        gallery.setPictures(pictures);
      });
    })();
  });
