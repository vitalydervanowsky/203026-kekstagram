function getMessage(a, b) {
  var message = '';
  if (typeof a === 'boolean') {
    if (a === true) {
      message += 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    }
    else {
      message += 'Переданное GIF-изображение не анимировано';
    }
  }
  else if (typeof a === 'number') {
    message += 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  }
  else if (Object.prototype.toString.call( a ) === '[object Array]' && Object.prototype.toString.call( b ) !== '[object Array]') {
    var amountOfRedPoints = 0;
    for (var i = a.length - 1; i >= 0; i--) {
      amountOfRedPoints += a[i];
    }
    message += 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  }
  else if (Object.prototype.toString.call( a ) === '[object Array]' && Object.prototype.toString.call( b ) === '[object Array]') {
    var artifactsSquare = 0;
    for (i = a.length - 1; i >= 0; i--) {
      for (var j = b.length - 1; j >= 0; j--) {
        artifactsSquare += a[i] * b[j];
      }
    }
    message += 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  }
  return message;
}
