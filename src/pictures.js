'use strict';

define('pictures',
  ['./load', './picture', './gallery'],
  function(load, picture, Gallery) {
    (function() {
      var picturesContainer = document.querySelector('.pictures');

      load('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
        var filtersBlock = document.querySelector('.filters');
        filtersBlock.classList.add('hidden');
        var pictures = data;
        pictures.forEach(function(pic) {
          picture(pic, picturesContainer);
        });
        filtersBlock.classList.remove('hidden');
        var gallery = new Gallery();
        gallery.setPictures(pictures);
      });
    })();
  });
