  /**
   * jQuery function that fits element to its container.
   *
   * Options:
   * heightOffset - value removed from container height in calculation.
   * imageHandling - element is handled like it has an dynamic intrinsic size.
   * clipOverflow - if excess gets clipped. Recommended for imageHandling.
   * centering - if overflowing content gets centered.
   */
$.fn.extend({
  hfFitContainer: function($definedContainer, options, callback) {
    // Defining the container parameter is optional. Defaults to parent el.
    var $container = $definedContainer !== undefined ? $definedContainer : $(this).parent();
    if ($container.length == 0) {
      return $(this);
    }

    var settings = {
      heightOffset: 0,
      imageHandling: false,
      clipOverflow: false,
      centering: false
    };
    var settings = $.extend(settings, options);

    // Define clipping box as parent.
    var $clippingBox = $(this).parent();

    // Reset dimensions to auto and such.
    $(this).height('auto');
    $(this).width('auto');
    $(this).css('left', 'auto');
    $(this).css('top', 'auto');
    $(this).css('position', 'relative');
    $(this).css('min-height', '0');

    // Clipping box clips overflow with the CSS attribute.
    if (settings.clipOverflow) {
      $clippingBox.css('overflow', 'hidden');
    }
    $clippingBox.height('auto');

    // If handled like an image where its content has dynamic intrinsic size.
    if (settings.imageHandling) {
      var height = $(this).height();
      var width = $(this).width();
      var containerHeight = $container.height() - settings.heightOffset;
      var containerWidth = $container.width();
      var ratio = width / height;
      var containerRatio = containerWidth / containerHeight;

      // Landscape relative to container -> force top and bottom.
      if (ratio > containerRatio) {
        var heightDiff = containerHeight / height;
        var newWidth = containerWidth * heightDiff;
        $(this).width(newWidth);

        if (settings.centering) {
          // Center horizontally.
          var overflowX = newWidth - containerWidth;
          $(this).css('left', -(overflowX / 2));
        }
      }
      // Portrait relative to container -> don't calc, but center vertically.
      else {
        if (settings.centering) {
        // Center vertically.
          var overflowY = height - containerHeight;
          $(this).css('top', -(overflowY / 2));
        }

        // Limit clipping box height to container height.
        $clippingBox.height(containerHeight);
      }

      // if (settings.centering) {
      //   // Center vertically.
      //   var overflowY = height - containerHeight;
      //   if (overflowY > 0) {
      //     $(this).css('top', -(overflowY / 2));
      //   }

      //   // Center horizontally.
      //   // Get width again, because it may have been updated.
      //   var newWidth = $(this).width();
      //   var overflowX = width - containerWidth;
      //   if (overflowX > 0) {
      //     $(this).css('left', -(overflowX / 2));
      //   }
      // }
    }
    else {
      // Width is handled by block flow so only force min-height.
      $(this).css('min-height', $container.height() - settings.heightOffset + 'px');
    }

    // Call callback if defined.
    if (callback !== undefined) {
      callback();
    }

    return $(this);
  }
});

$(document).ready(function() {
  $('.full-screen-element').each(function() {
    var that = this;
    var disabled = $(this).hasClass('full-screen-element-disabled')

    var resize = function() {
      var offsetTop = $(that).offset().top;
      // First fit full screen element to window, then as callback, fit
      // background to full screen element.
      $(that).hfFitContainer($(window), {
        heightOffset: offsetTop
      }, function() {
        $('.full-screen-background .full-screen-background-content', that).hfFitContainer($(that), {
          imageHandling: true,
          clipOverflow: true,
          centering: true
        });
      });
    };

    if (!disabled) {
      $(that).addClass('full-screen-element-ready');
      $(window).resize(function() { resize(); });
      resize();

      // Add background toggler.
      var $bgToggler = $('<span class="full-screen-background-toggler">Toggle background</span>');
      $bgToggler.click(function(e) {
        $(that).toggleClass('full-screen-background-visible');
      });
      $(that).prepend($bgToggler);
    }
  });

  // Set first full-screen-element.
  $('.full-screen-helper').unbind('click').remove();
  var $helperArrow = $('<span class="full-screen-helper"><span></span><span></span><span></span></span>');
  $('.full-screen-element')
    .removeClass('first-full-screen')
    .first()
    .addClass('first-full-screen')
    .append($helperArrow);
  $('.full-screen-helper').click(function() {
    var $container = $(this).parents('.full-screen-element');
    $(window).scrollTop($container.offset().top + $container.outerHeight());
  });
});
