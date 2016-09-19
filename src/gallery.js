'use strict';

define('gallery',
  function() {
    var Gallery = function() {
      this.pictures = [];
      this.activePicture = 0;
      this.galleryContainer = document.querySelector('.gallery-overlay');
      this.closeElement = this.galleryContainer.querySelector('.gallery-overlay-close');
      this.previewElement = this.galleryContainer.querySelector('.gallery-overlay-image');
      this.onPreviewElementClick = this.onPreviewElementClick.bind(this);
      this.previewElement.addEventListener('click', this.onPreviewElementClick);
    };

    Gallery.prototype.setPictures = function(data) {
      this.pictures = data;
    };

    Gallery.prototype.show = function(hash) {
      this.hide = this.hide.bind(this);
      this.closeElement.addEventListener('click', this.hide);
      this.setActivePicture(hash);
    };

    Gallery.prototype.hide = function() {
      location.hash = '';
      this.closeElement.onclick = null;
    };

    Gallery.prototype.setActivePicture = function(picture) {
      this.previewElement.src = picture.match(/#photo\/(\S+)/)[1];
      for(var i = 0; i < this.pictures.length; i++) {
        if (this.pictures[i].url === picture.match(/#photo\/(\S+)/)[1]) {
          this.activePicture = i;
          this.likesCount = this.pictures[i].likes;
          this.commentsCount = this.pictures[i].comments;
          i = this.pictures.length;
        }
      }
      this.galleryContainer.querySelector('.likes-count').innerHTML = this.likesCount;
      this.galleryContainer.querySelector('.comments-count').innerHTML = this.commentsCount;
    };

    Gallery.prototype.onPreviewElementClick = function() {
      if (this.activePicture < this.pictures.length - 1) {
        this.activePicture++;
      } else {
        this.activePicture = 0;
      }
      location.hash = 'photo/' + this.pictures[this.activePicture].url;
    };

    return new Gallery();
  });
