var Gallery = (function() {
  var $filmstrip,
      $grid,
  init = function() {
    $filmstrip = $('.js-gallery');
    $grid = $filmstrip.clone().hide().addClass('gallery--grid').insertBefore($filmstrip);
    $filmstrip.addClass('gallery--filmstrip');

    placehold();
    bindEvents();
  },

  bindEvents = function() {
    $('body').on('click', '.js-show-thumbnails', function(e) {
      $filmstrip.hide();
      $grid.show();
    });
    $('.gallery--grid').on('click', '.js-gallery-item', function(e) {
      $grid.hide();
      $filmstrip.show();
    });
  },

  placehold = function() {

    $('.js-gallery').each(function(i, obj) {

      var $gallery        = $(obj)
          isGrid          = $gallery.hasClass('gallery--grid'),
          containerHeight = $gallery.height();

        $gallery.find('.js-gallery-item').each(function(j, obj) {
          var $galleryItem  = $(obj),
              width         = $galleryItem.data('width'),
              height        = $galleryItem.data('height'),
              newHeight     = isGrid ? 240 : containerHeight,
              newWidth      = newHeight * width / height,
              src           = $galleryItem.data('srcfull'),
              $image        = $(document.createElement('img'));

          $galleryItem.width(newWidth).height(newHeight);
          $image.width(newWidth).height(newHeight).attr('src', src).prependTo($galleryItem);

        });
    });

}

  return {
    init: init
  }
})()