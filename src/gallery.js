'use strict';

define('gallery',
  function() {
    return function(data) {
      var Gallery = function() {
        this.pictures = [];
        this.activePicture = 0;
        this.galleryContainer = document.querySelector('.gallery-overlay');
        this.closeElement = this.galleryContainer.querySelector('.gallery-overlay-close');
        this.preview = this.galleryContainer.querySelector('.gallery-overlay-image');
      };

      Gallery.prototype.setPicture = function(data2) {
        this.pictures = data2;
      };

      Gallery.prototype.show = function(num) {
        var self = this;
        this.closeElement.onclick = function() {
          self.onCloseClickHandler();
        };

        this.galleryContainer.classList.remove('invisible');
        this.setActivePicture(num);
      };

      Gallery.prototype.hide = function() {
        this.galleryContainer.classList.add('invisible');
        this.closeElement.onclick = null;
      };

      Gallery.prototype.setActivePicture = function(num) {
        this.activePicture = num;
        this.src = this.pictures[this.activePicture].src;

        this.likesCount = this.galleryContainer.querySelector('.likes-count').innerHTML;
        this.commentsCount = this.galleryContainer.querySelector('.comments-count').innerHTML;
      };

      Gallery.prototype.onCloseClickHandler = function() {
        self.hide();
      };

      var gallery = new Gallery();
      gallery.setPicture(data); // где это записать?
      console.log(gallery.src);
    };
  });
