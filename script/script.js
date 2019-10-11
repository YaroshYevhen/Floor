var APP = {};
APP.$document = $(document);
APP.slider = $('.slider-container');
APP.sliderArrow = $('.slider-arrow');
APP.sliderNav = $('.slider-arrow, .slider-dots');
APP.testimonialsTab = $('.testimonials-tabs__item');
APP.calculatorShowBtn = $('.main-screen__btn');
APP.calculatorClose = $('.calculator-close');
APP.calculatorDropdownBtn = $('.calculator-select__current');
APP.hamburger = $('.hamburger');
APP.scrollBtn = $('.scroll-btn');
APP.socialsOpenBtn = $('.socials__item_share');
APP.advantagesShowText = $('.advantages-item__show, .aftermatch-item__show');

function calculatorHide() {
	$('.calculator-container').addClass('unfixed');
	$('.main-screen__bg').removeClass('show');
	$('.socials').removeClass('hide');
	$('html').removeClass('overflow');
	$('.calculator-container').removeClass('overflow-auto');
	setTimeout(function (){
	  $('.calculator-container').removeClass('unfixed').removeClass('fixed');
	}, 600);
}

APP.$document.ready(function() {
	APP.advantagesShowText.on('click', function() {
		$(this).parents('.advantages-item, .aftermatch-item').find('.advantages-item__text, .aftermatch-item__text').toggleClass('show');
		$(this).toggleClass('hide');
	})

	APP.socialsOpenBtn.on('click', function() {
		$(this).parents('.socials').toggleClass('opened');
	})

	APP.scrollBtn.on('click', function() {
		let headerHeight = $('.header').height();
		let section = $(this).data('scroll');
    let scrollTo = $(section).offset().top - headerHeight;

    if(section === ".services") {
    	scrollTo = scrollTo + 270;
    }

		$('html').removeClass('overflow');
		$('html, body').animate({ scrollTop: scrollTo }, 500);
		$('body').removeClass('menu');
    APP.hamburger.removeClass('active');
	})

	APP.hamburger.on('click', function(){
		$('.socials').removeClass('opened');
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
    if($('body').hasClass('menu')) {
      $('.nav').scrollTop(0);
    }
  });

	APP.calculatorDropdownBtn.on('click', function() {
		if($(this).hasClass('active')) {
			$('.calculator-select__current').removeClass('active');
		} else {
			$('.calculator-select__current').removeClass('active');
			$(this).addClass('active');
		}
	})

	APP.$document.on('click', function(event) {
		if(!$(event.target).hasClass('.calculator-select') && !$(event.target).parents('.calculator-select').length) {
			$('.calculator-select__current.active').removeClass('active');
		}
	})

	let lastScrollTop = 0;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if ((st > lastScrollTop && $('.calculator-container').hasClass('fixed')) && ($(window).width() > 767)){
	       calculatorHide();
	   } else {
	      // upscroll code
	   }
	   lastScrollTop = st;
	});

	APP.calculatorClose.on('click', function() {
		calculatorHide();
	})

	APP.calculatorShowBtn.on('mouseenter', function() {
		$('.calculator-container').addClass('will-change');
		$('.main-screen__bg').addClass('will-change');
		$('.main-screen__bg .figure').addClass('will-change');
	})

	APP.calculatorShowBtn.on('mouseleave', function() {
		$('.calculator-container').removeClass('will-change');
		$('.main-screen__bg').removeClass('will-change');
		$('.main-screen__bg .figure').removeClass('will-change');
	})

	APP.calculatorShowBtn.on('click', function() {
		$('.calculator-container').addClass('fixed');
		$('html').animate({ scrollTop : 0}, 300)
		$('.main-screen__bg').addClass('show');
		$('.socials').removeClass('opened').addClass('hide');
		if($(window).width() <= 767) {
			$('html').addClass('overflow');
			$('.calculator-container').addClass('overflow-auto');
		}
	})

	APP.testimonialsTab.on('click', function() {
		let data = $(this).data('switch');

		$('.testimonials-tabs__item.current').removeClass('current');
		$(this).addClass('current');
		$('.testimonials-slider.current').removeClass('current');
		$('.testimonials-slider[data-type="' + data + '"]').addClass('current');

		if(data === 'video') {
			$('.testimonials-tabs__track').addClass('switched');
		} else {
			$('.testimonials-tabs__track').removeClass('switched');
		}
	})

	APP.sliderNav.each(function() {
		let slider = $(this).parents('.slider-container');
		let slidesCount = slider.find('.slider-item').length;

		if(($(window).width() > 1199) && (slider.hasClass('testimonials-slider') && slidesCount < 3) || 
			 (slider.hasClass('gallery-slider') && slidesCount < 2)) {
			$(this).hide();
		}
	})

	$(document).keyup(function(e) { 
    APP.slider.each(function() {
      let isCanSlide = (($(window).scrollTop() + $(window).height() > $(this).offset().top) && ($(window).scrollTop() < $(this).offset().top)) ? true : false;
      if (e.keyCode == 39 && isCanSlide) { 
        $(this).find('.slider-arrow_next').click();
      } 
      if (e.keyCode == 37 && isCanSlide) { 
        $(this).find('.slider-arrow_prev').click();
      } 
    })
  });

	APP.sliderArrow.on('click', function() {
		let slider = $(this).parents('.slider-container');
		let firstSlide = slider.find('.slider-item.first');
		let secondSlide = slider.find('.slider-item.second');
		let thirdSlide = slider.find('.slider-item.third');
    let isMoreThanThree = slider.find('.slider-item.third').next('.slider-item').length;
		let nextSlide = isMoreThanThree? slider.find('.slider-item.third').next():slider.find('.slider-item.third');
		let lastSlide = slider.find('.slider-item:last-of-type');

		let clone;

		if($(this).hasClass('slider-arrow_next')) {
			clone = firstSlide.clone().removeClass('first');
			firstSlide.addClass('prev').removeClass('first');
			setTimeout(function (){
			  firstSlide.remove();
			}, 300);
			secondSlide.addClass('first').removeClass('second');
			thirdSlide.addClass('second').removeClass('third');
      if(isMoreThanThree) {
        nextSlide.addClass('third');
      } else {
        setTimeout(function() {
          clone.addClass('third');
        }, 0);
      }
			lastSlide.after(clone);
		}	else if($(this).hasClass('slider-arrow_prev')) {
			clone = lastSlide.clone().removeClass('third').addClass('prev').addClass('first');

			firstSlide.before(clone).addClass('second').removeClass('first');
			setTimeout(function() {
				clone.removeClass('prev');
			}, 0);
			secondSlide.addClass('third').removeClass('second');
			thirdSlide.removeClass('third');
      lastSlide.remove();
		}

			// countSlides(slider);
	})
})