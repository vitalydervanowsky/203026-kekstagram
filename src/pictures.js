'use strict';

define('pictures',
  ['./load', './picture', './gallery'],
  function(load, Picture, gallery) {
    (function() {
      var PICTURES_LOAD_URL = '/api/pictures';
      var THROTTLE_TIMEOUT = 100;
      var GAP = 100;

      var activeFilter = 'filter-popular';
      var picturesContainer = document.querySelector('.pictures');
      var filtersBlock = document.querySelector('.filters');
      filtersBlock.classList.remove('hidden');
      var footer = document.querySelector('footer');
      var pageNumber = 0;
      var pageSize = 12;
      var pictures = [];

      var renderPictures = function(loadedPictures) {
        loadedPictures.forEach(function(picData, index) {
          picturesContainer.appendChild(new Picture(picData, index).element);
        });
        // console.log(loadedPictures);
        pictures.push.apply(pictures, loadedPictures);
        console.log(pictures);
        gallery.setPictures(pictures);
      };

      var loadPictures = function(filter, currentPageNumber) {
        load(PICTURES_LOAD_URL, {
          from: currentPageNumber * pageSize,
          to: currentPageNumber * pageSize + pageSize,
          filter: filter
        }, renderPictures);
      };

      var changeFilter = function(filterID) {
        picturesContainer.innerHTML = '';
        pictures = [];
        activeFilter = filterID;
        pageNumber = 0;
        loadPictures(filterID, pageNumber);
      };

      filtersBlock.addEventListener('change', function(evt) {
        if (evt.target.classList.contains('filters-radio')) {
          // console.log('1');
          changeFilter(evt.target.id);
        }
      });

      var lastCall = Date.now();

      window.addEventListener('scroll', function() {
        if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
          if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
            loadPictures(activeFilter, ++pageNumber);
            // console.log(loadedPictures);
          }

          lastCall = Date.now();
        }
      });

      changeFilter(activeFilter);
    })();
  });
