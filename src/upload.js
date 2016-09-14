/* global Resizer: true */

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

define(function() {
  return function() {
    /** @enum {string} */
    var FileType = {
      'GIF': '',
      'JPEG': '',
      'PNG': '',
      'SVG+XML': ''
    };

    /** @enum {number} */
    var Action = {
      ERROR: 0,
      UPLOADING: 1,
      CUSTOM: 2
    };

    /**
     * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
     * из ключей FileType.
     * @type {RegExp}
     */
    var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');

    /**
     * @type {Object.<string, string>}
     */
    var filterMap;

    /**
     * Объект, который занимается кадрированием изображения.
     * @type {Resizer}
     */
    var currentResizer;

    /**
     * Удаляет текущий объект {@link Resizer}, чтобы создать новый с другим
     * изображением.
     */
    function cleanupResizer() {
      if (currentResizer) {
        currentResizer.remove();
        currentResizer = null;
      }
    }

    /**
     * Ставит одну из трех случайных картинок на фон формы загрузки.
     */
    function updateBackground() {
      var images = [
        'img/logo-background-1.jpg',
        'img/logo-background-2.jpg',
        'img/logo-background-3.jpg'
      ];

      var backgroundElement = document.querySelector('.upload');
      var randomImageNumber = Math.round(Math.random() * (images.length - 1));
      backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
    }

    /**
     * Проверяет, валидны ли данные, в форме кадрирования.
     * @return {boolean}
     */
    function resizeFormIsValid() {
      return true;
    }

    /**
     * Форма загрузки изображения.
     * @type {HTMLFormElement}
     */
    var uploadForm = document.forms['upload-select-image'];

    /**
     * Форма кадрирования изображения.
     * @type {HTMLFormElement}
     */
    var resizeForm = document.forms['upload-resize'];

    /**
     * Форма добавления фильтра.
     * @type {HTMLFormElement}
     */
    var filterForm = document.forms['upload-filter'];

    /**
     * @type {HTMLImageElement}
     */
    var filterImage = filterForm.querySelector('.filter-image-preview');

    // browser-cookies
    var browserCookies = require('browser-cookies');
    filterImage.className = 'filter-image-preview filter-' + browserCookies.get('upload-filter');
    if (browserCookies.get('upload-filter')) {
      var radioInputDefault = filterForm.querySelector('#upload-filter-' + browserCookies.get('upload-filter'));
      radioInputDefault.checked = true;
    }

    /**
     * @type {HTMLElement}
     */
    var uploadMessage = document.querySelector('.upload-message');

    /**
     * @param {Action} action
     * @param {string=} message
     * @return {Element}
     */
    function showMessage(action, message) {
      var isError = false;

      switch (action) {
        case Action.UPLOADING:
          message = message || 'Кексограмим&hellip;';
          break;

        case Action.ERROR:
          isError = true;
          message = message || 'Неподдерживаемый формат файла<br> <a href="' + document.location + '">Попробовать еще раз</a>.';
          break;
      }

      uploadMessage.querySelector('.upload-message-container').innerHTML = message;
      uploadMessage.classList.remove('invisible');
      uploadMessage.classList.toggle('upload-message-error', isError);
      return uploadMessage;
    }

    function hideMessage() {
      uploadMessage.classList.add('invisible');
    }

    /**
     * Обработчик изменения изображения в форме загрузки. Если загруженный
     * файл является изображением, считывается исходник картинки, создается
     * Resizer с загруженной картинкой, добавляется в форму кадрирования
     * и показывается форма кадрирования.
     * @param {Event} evt
     */
    uploadForm.addEventListener('change', function(evt) {
      var element = evt.target;
      if (element.id === 'upload-file') {
        // Проверка типа загружаемого файла, тип должен быть изображением
        // одного из форматов: JPEG, PNG, GIF или SVG.
        if (fileRegExp.test(element.files[0].type)) {
          var fileReader = new FileReader();

          showMessage(Action.UPLOADING);

          fileReader.addEventListener('load', function() {
            cleanupResizer();

            currentResizer = new Resizer(fileReader.result);

            currentResizer.setElement(resizeForm);
            uploadMessage.classList.add('invisible');

            uploadForm.classList.add('invisible');
            resizeForm.classList.remove('invisible');

            hideMessage();

            var resizeX = resizeForm.querySelector('#resize-x');
            var resizeY = resizeForm.querySelector('#resize-y');
            var resizeSize = resizeForm.querySelector('#resize-size');

            // start of validation
            resizeX.min = 0;
            resizeX.max = currentResizer._image.naturalWidth - 1;
            resizeY.min = 0;
            resizeY.max = currentResizer._image.naturalHeight - 1;

            var setSizeConstraint = function(posStartX, posStartY, sizeCrop) {
              var submitBtn = resizeForm.querySelector('#resize-fwd');
              posStartX = parseInt(posStartX, 10);
              posStartY = parseInt(posStartY, 10);

              sizeCrop.min = 1;
              sizeCrop.max = Math.min(
                (currentResizer._image.naturalWidth - posStartX),
                (currentResizer._image.naturalHeight - posStartY));

              var areValuesValid = posStartX + parseInt(sizeCrop.value, 10) <= currentResizer._image.naturalWidth && posStartY + parseInt(sizeCrop.value, 10) <= currentResizer._image.naturalHeight;

              if (areValuesValid && posStartX >= 0 && posStartY >= 0 && parseInt(sizeCrop.value, 10) >= 0) {
                submitBtn.disabled = false;
              } else {
                submitBtn.disabled = true;
              }
            };

            resizeForm.addEventListener('change', function() {
              currentResizer.setConstraint(parseInt(resizeX.value, 10), parseInt(resizeY.value, 10), parseInt(resizeSize.value, 10));
            });



            // end of validation

            var fromResizerToForm = function() {
              resizeX.value = currentResizer.getConstraint().x;
              resizeY.value = currentResizer.getConstraint().y;
              resizeSize.value = currentResizer.getConstraint().side;
            };

            window.addEventListener('resizerchange', function() {
              fromResizerToForm();
              setSizeConstraint(resizeX.value, resizeY.value, resizeSize);
            });
          });

          fileReader.readAsDataURL(element.files[0]);
        } else {
          // Показ сообщения об ошибке, если формат загружаемого файла не поддерживается
          showMessage(Action.ERROR);
        }
      }
    });

    /**
     * Обработка сброса формы кадрирования. Возвращает в начальное состояние
     * и обновляет фон.
     * @param {Event} evt
     */
    resizeForm.addEventListener('reset', function(evt) {
      evt.preventDefault();

      cleanupResizer();
      updateBackground();

      resizeForm.classList.add('invisible');
      uploadForm.classList.remove('invisible');
    });

    /**
     * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
     * кропнутое изображение в форму добавления фильтра и показывает ее.
     * @param {Event} evt
     */
    resizeForm.addEventListener('submit', function(evt) {
      evt.preventDefault();

      if (resizeFormIsValid()) {
        var image = currentResizer.exportImage().src;

        var thumbnails = filterForm.querySelectorAll('.upload-filter-preview');
        for (var i = 0; i < thumbnails.length; i++) {
          thumbnails[i].style.backgroundImage = 'url(' + image + ')';
        }

        filterImage.src = image;

        resizeForm.classList.add('invisible');
        filterForm.classList.remove('invisible');
      }
    });

    /**
     * Сброс формы фильтра. Показывает форму кадрирования.
     * @param {Event} evt
     */
    filterForm.addEventListener('reset', function(evt) {
      evt.preventDefault();

      filterForm.classList.add('invisible');
      resizeForm.classList.remove('invisible');
    });

    /**
     * Отправка формы фильтра. Возвращает в начальное состояние, предварительно
     * записав сохраненный фильтр в cookie.
     * @param {Event} evt
     */
    filterForm.addEventListener('submit', function(evt) {
      evt.preventDefault();

      cleanupResizer();
      updateBackground();

      filterForm.classList.add('invisible');
      uploadForm.classList.remove('invisible');

      // start of cookies
      var today = new Date();
      var year = today.getFullYear();
      var birthDayGraceHopper = new Date(year + '-12-09');

      if (birthDayGraceHopper > today) {
        birthDayGraceHopper = new Date(--year + '-12-09');
      }

      var getFullDays = function(date) {
        var daysFloat = date / 1000 / 60 / 60 / 24;
        return Math.floor(daysFloat);
      };

      var lifetime = getFullDays(today) - getFullDays(birthDayGraceHopper);
      browserCookies.set('upload-filter', browserCookies.get('upload-filter'), {expires: lifetime});
      // end of cookies
    });

    /**
     * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
     * выбранному значению в форме.
     */
    filterForm.addEventListener('change', function() {
      if (!filterMap) {
        // Ленивая инициализация. Объект не создается до тех пор, пока
        // не понадобится прочитать его в первый раз, а после этого запоминается
        // навсегда.
        filterMap = {
          'none': 'filter-none',
          'chrome': 'filter-chrome',
          'sepia': 'filter-sepia',
          'marvin': 'filter-marvin'
        };
      }

      var selectedFilter = [].filter.call(filterForm['upload-filter'], function(item) {
        return item.checked;
      })[0].value;

      // Класс перезаписывается, а не обновляется через classList потому что нужно
      // убрать предыдущий примененный класс. Для этого нужно или запоминать его
      // состояние или просто перезаписывать.
      filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];

      // browser-cookies
      browserCookies.set('upload-filter', selectedFilter);
    });

    cleanupResizer();
    updateBackground();
  };
});
