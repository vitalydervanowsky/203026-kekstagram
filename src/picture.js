'use strict';

define('picture',
  ['./gallery'],
  function(gallery) {
    var templateElement = document.querySelector('#picture-template');
    var elementToClone;
    var IMAGE_LOAD_TIMEOUT = 10000;

    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector('.picture');
    } else {
      elementToClone = templateElement.querySelector('.picture');
    }

    var getPictureElement = function(data) {
      var element = elementToClone.cloneNode(true);

      element.addEventListener('click', function(evt) {
        evt.preventDefault();
      });

      element.querySelector('.picture-likes').textContent = data.likes;
      element.querySelector('.picture-comments').textContent = data.comments;

      var backgroundImage = new Image();

      backgroundImage.onload = function(evt) {
        clearTimeout(backgroundLoadTimeout);
        element.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
        element.style.width = '182px';
        element.style.height = '182px';
      };

      backgroundImage.onerror = function() {
        element.classList.add('picture-load-failure');
      };

      backgroundImage.src = data.url;

      var backgroundLoadTimeout = setTimeout(function() {
        backgroundImage.src = '';
        element.classList.add('picture-load-failure');
      }, IMAGE_LOAD_TIMEOUT);

      element.onclick = function() {
        location.hash = 'photo/' + data.url;
      };

      return element;
    };

    var Picture = function(data) {
      this.data = data;
      this.element = getPictureElement(data);
      this.onPictureClick = this.onPictureClick.bind(this);
      this.element.addEventListener('click', this.onPictureClick);
    };

    Picture.prototype.onPictureClick = function(evt) {
      if (evt.target.classList.contains('picture')) {
        gallery.show(this.data.pictures);
      }
    };

    return Picture;
  });
