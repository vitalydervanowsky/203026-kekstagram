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
      var storageFilter = localStorage.getItem('filter');

      if (storageFilter) {
        activeFilter = storageFilter;
      }

      var renderPictures = function(loadedPictures) {
        loadedPictures.forEach(function(picData) {
          picturesContainer.appendChild(new Picture(picData).element);
        });
        pictures.push.apply(pictures, loadedPictures);
        gallery.setPictures(pictures);
        if (window.innerHeight > footer.getBoundingClientRect().bottom) {
          loadPictures(activeFilter, ++pageNumber);
        }

        gallery.onHashChange();
      };

      var loadPictures = function(filter, currentPageNumber) {
        var fromVar = currentPageNumber * pageSize;
        if (fromVar <= pictures.length) {
          load(PICTURES_LOAD_URL, {
            from: fromVar,
            to: fromVar + pageSize,
            filter: filter
          }, renderPictures);
        }
      };

      var changeFilter = function(filterID) {
        picturesContainer.innerHTML = '';
        pictures = [];
        activeFilter = filterID;
        pageNumber = 0;
        filtersBlock.querySelector('#' + activeFilter).checked = true;
        loadPictures(filterID, pageNumber);
      };

      filtersBlock.addEventListener('change', function(evt) {
        if (evt.target.classList.contains('filters-radio')) {
          changeFilter(evt.target.id);
          localStorage.setItem('filter', evt.target.id);
        }
      });

      var lastCall = Date.now();

      window.addEventListener('scroll', function() {
        if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
          if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
            loadPictures(activeFilter, ++pageNumber);
          }

          lastCall = Date.now();
        }
      });

      changeFilter(activeFilter);
    })();
  });
