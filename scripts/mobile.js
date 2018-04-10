$(document).ready(function() {
	var $menu = $('.main-menu');
	var $target = $menu.parent().parent();
	var $menuContent = $menu.html();

	var $toggler = $('<button class="mobile-menu--toggler"><div class="visually-hidden">Toggle menu</div><div role="presentation" aria-hidden="true"><span></span><span></span></div></button>');
	var $drawer = $('<div class="mobile-menu--drawer"></div>');
	var $overlay = $('<div class="mobile-menu--overlay"></div>');
	$drawer.append($menuContent);
	$target.append($toggler);
	$target.append($drawer);
	$('body').append($overlay);

	var mobileActive = false;
	var resize = function() {
		if ($(window).width() < 767 && !mobileActive) {
			$target.parent().addClass('mobile-menu--active');
			mobileActive = true;
		}
		if ($(window).width() >= 767 && mobileActive) {
			$target.parent().removeClass('mobile-menu--active');
			mobileActive = false;
		}
	};

	var toggleMenu = function(state, force) {
		var currentState = $target.hasClass('mobile-menu--open');
		if (state == undefined) {
			state = !currentState;
		}

		if (state != currentState || force) {
			$target.toggleClass('mobile-menu--open', state);
			$('body').toggleClass('mobile-menu--open', state);
		}
	}

	$toggler.click(function() {
		toggleMenu();
	});
	
	$('ul a', $target).focus(function() {
		toggleMenu(true);
	});
	$('ul a', $target).focusout(function(e) {
		toggleMenu(false);
	});

	resize();
	$(window).resize(function() { resize(); });
});
