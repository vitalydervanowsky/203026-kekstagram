'use strict';

define('picture',
  ['./gallery'],
  function(gallery, index) {
    var templateElement = document.querySelector('#picture-template');
    var elementToClone;
    var IMAGE_LOAD_TIMEOUT = 10000;

    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector('.picture');
    } else {
      elementToClone = templateElement.querySelector('.picture');
    }

    return function(jsonpData, container, index) {
      var element = elementToClone.cloneNode(true);

      element.addEventListener('click', function(evt) {
        evt.preventDefault();
      });

      element.querySelector('.picture-likes').textContent = jsonpData.likes;
      element.querySelector('.picture-comments').textContent = jsonpData.comments;
      container.appendChild(element);

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

      backgroundImage.src = jsonpData.url;

      var backgroundLoadTimeout = setTimeout(function() {
        backgroundImage.src = '';
        element.classList.add('picture-load-failure');
      }, IMAGE_LOAD_TIMEOUT);

      element.onclick = function() {
        gallery.show(index);
        // console.log(index);
      };

      return element;
    };
  });
