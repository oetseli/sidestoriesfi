$(document).ready(function() {
	var $menu = $('.main-menu');
	var $target = $menu.parent().parent();
	var $menuContent = $menu.html();

	var $toggler = $('<span class="mobile-menu--toggler"><span></span><span></span></span>');
	var $drawer = $('<div class="mobile-menu--drawer"></div>');
	var $overlay = $('<div class="mobile-menu--overlay"></div>');
	$drawer.append($menuContent);
	$target.append($toggler);
	$target.append($drawer);
	$('body').append($overlay);

	var mobileActive = false;
	var resize = function() {
		if ($(window).width() < 767 && !mobileActive) {
			$target.addClass('mobile-menu--active');
			mobileActive = true;
		}
		if ($(window).width() >= 767 && mobileActive) {
			$target.removeClass('mobile-menu--active');
			mobileActive = false;
		}
	};

	$toggler.click(function() {
		var state = $target.hasClass('mobile-menu--open');

		$target.toggleClass('mobile-menu--open', !state);
		$('body').toggleClass('mobile-menu--open', !state);
	});

	resize();
	$(window).resize(function() { resize(); });
});
