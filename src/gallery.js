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
      this.onHashChange = this.onHashChange.bind(this);
      window.addEventListener('hashchange', this.onHashChange);
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
      var src = picture.match(/#photo\/(\S+)/)[1];
      this.previewElement.src = src;
      for(var i = 0; i < this.pictures.length; i++) {
        if (this.pictures[i].url === src) {
          this.activePicture = i;
          i = this.pictures.length;
        }
      }
      this.likesCount = this.pictures[this.activePicture].likes;
      this.commentsCount = this.pictures[this.activePicture].comments;
      this.galleryContainer.querySelector('.likes-count').innerHTML = this.likesCount;
      this.galleryContainer.querySelector('.comments-count').innerHTML = this.commentsCount;
    };

    Gallery.prototype.onPreviewElementClick = function() {
      this.activePicture = (this.activePicture < this.pictures.length - 1) ? ++this.activePicture : 0;
      location.hash = 'photo/' + this.pictures[this.activePicture].url;
    };

    Gallery.prototype.onHashChange = function() {
      if (location.hash) {
        this.galleryContainer.classList.remove('invisible');
        this.show(location.hash);
      } else {
        this.galleryContainer.classList.add('invisible');
      }
    };

    return new Gallery();
  });
