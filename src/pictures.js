'use strict';

var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('#picture-template');
var elementToClone;

var pictures = null;

var IMAGE_LOAD_TIMEOUT = 10000;

var loadPictures = function(address, callback) {
  var scriptEl = document.createElement('script');
  scriptEl.src = address;
  document.body.appendChild(scriptEl);

  window.JSONPCallback = function(data) {
    callback(data);
  };
};

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

loadPictures('http://localhost:1506/api/pictures?callback=JSONPCallback', function(data) {
  var filtersBlock = document.querySelector('.filters');
  filtersBlock.classList.add('hidden');
  pictures = data;

  pictures.forEach(function(pic) {
    getPictureElement(pic, picturesContainer);
  });

  filtersBlock.classList.remove('hidden');
});

var getPictureElement = function(jsonpData, container) {
  var element = elementToClone.cloneNode(true);
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

  return element;
};
