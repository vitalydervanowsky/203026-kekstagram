'use strict';

define('pictures',
  ['./load', './picture', './gallery'],
  function(load, picture, gallery) {
    (function() {
      var picturesContainer = document.querySelector('.pictures');

      load('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
        var filtersBlock = document.querySelector('.filters');
        filtersBlock.classList.add('hidden');
        var pictures = data;
        var num = 0;
        pictures.forEach(function(pic) {
          picture(pic, picturesContainer, num);
          num++;
        });
        filtersBlock.classList.remove('hidden');
        gallery.setPictures(pictures);
      });
    })();
  });
