'use strict';

define('gallery', function() {
  return function() {
    var Gallery = function() {
      this.pictures = [];
      this.activePicture = 0;
      this.galleryContainer = document.querySelector('.gallery-overlay');
      this.closeElement = this.galleryContainer.querySelector('.gallery-overlay-close');
      this.preview = this.galleryContainer.querySelector('.gallery-overlay-image');
    };

    Gallery.prototype.setPicture = function(arrPic) {
      this.pictures = arrPic;
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
    };

    Gallery.prototype.setActivePicture = function(num) {
      this.activePicture = num;
      // this.src = pictures[this.activePicture].src;

      this.likesCount = this.galleryContainer.querySelector('.likes-count').innerHTML;
      this.commentsCount = this.galleryContainer.querySelector('.comments-count').innerHTML;
    };

    Gallery.prototype.onCloseClickHandler = function() {
      self.hide();
    };

    var gallery = new Gallery();
    console.log(gallery.name);
  };
});
