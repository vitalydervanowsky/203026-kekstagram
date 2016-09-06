'use strict';

define('gallery',
  function() {
    var Gallery = function() {
      var self = this;
      this.pictures = [];
      this.activePicture = 0;
      this.galleryContainer = document.querySelector('.gallery-overlay');
      this.closeElement = this.galleryContainer.querySelector('.gallery-overlay-close');
      this.previewElement = this.galleryContainer.querySelector('.gallery-overlay-image');
      this.previewElement.onclick = function() {
        self.onPreviewElementClick();
      };
    };

    Gallery.prototype.setPictures = function(data) {
      this.pictures = data;
    };

    Gallery.prototype.show = function(num) {
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
      this.previewElement.src = this.pictures[picture].url;
      this.likesCount = this.pictures[picture].likes;
      this.commentsCount = this.pictures[picture].comments;
      this.galleryContainer.querySelector('.likes-count').innerHTML = this.likesCount;
      this.galleryContainer.querySelector('.comments-count').innerHTML = this.commentsCount;
    };

    Gallery.prototype.onPreviewElementClick = function() {
      if (this.activePicture < this.pictures.length - 1) {
        this.activePicture++;
      } else {
        this.activePicture = 0;
      }
      this.setActivePicture(this.activePicture);
    };

    return new Gallery();
  });
