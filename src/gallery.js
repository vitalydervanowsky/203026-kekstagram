'use strict';

define('gallery',
  function() {
    var Gallery = function() {
      this.pictures = [];
      this.activePicture = 0;
      this.galleryContainer = document.querySelector('.gallery-overlay');
      this.closeElement = this.galleryContainer.querySelector('.gallery-overlay-close');
      this.previewElement = this.galleryContainer.querySelector('.gallery-overlay-image');
    };

    Gallery.prototype.setPictures = function(data) {
      this.pictures = data;
    };

    Gallery.prototype.show = function(num) {
      var pictureElement = new Image();
      this.galleryContainer.appendChild(pictureElement);
      pictureElement.src = pic; // ??? так в кексобукинге было, будем исправлять

      var self = this;
      this.closeElement.onclick = function() {
        self.hide();
      };
      this.galleryContainer.classList.remove('invisible');
      this.setActivePicture(num);
    };

    Gallery.prototype.hide = function() {
      this.galleryContainer.classList.add('invisible');
      this.closeElement.onclick = null;
    };

    Gallery.prototype.setActivePicture = function(picture) {
      this.activePicture = picture;
      this.previewElement.src = this.pictures[picture].src;
      console.log(picture);
      console.log(this.previewElement.src);
      this.likesCount = this.galleryContainer.querySelector('.likes-count').innerHTML;
      this.commentsCount = this.galleryContainer.querySelector('.comments-count').innerHTML;
    };

    return Gallery;
  });
