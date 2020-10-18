window.onload = function () {
  'use strict';

  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var options = {
    aspectRatio: 16 / 9,
    preview: '.img-preview',
    ready: function (e) {
      console.log(e.type);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      var data = e.detail;

      console.log(e.type);
      dataX.value = Math.round(data.x);
      dataY.value = Math.round(data.y);
      dataHeight.value = Math.round(data.height);
      dataWidth.value = Math.round(data.width);
      dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
      dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
      dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  };
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageType = 'image/jpeg';
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageURL;

  // Import image
  var inputImage = document.getElementById('inputImage');

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        $.fancybox.open($('#crop-popup'));

        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;
          uploadedImageName = file.name;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }
};
