$(document).ready(function() {
	var $menu = $('.main-menu');
	var $target = $menu.parent().parent();
	var $menuContent = $menu.html();

	var $toggler = $('<span class="mobile-menu--toggler"><span></span><span></span></span>');
	var $drawer = $('<div class="mobile-menu--drawer"></div>');
	$drawer.append($menuContent);
	$target.append($toggler);
	$target.append($drawer);

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
		$target.toggleClass('mobile-menu--open');
	});

	resize();
	$(window).resize(function() { resize(); });
});