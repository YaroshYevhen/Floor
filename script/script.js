var APP = {};
APP.$document = $(document);
APP.slider = $('.slider-container');
APP.sliderArrow = $('.slider-arrow');
APP.sliderNav = $('.slider-arrow, .slider-dots');
APP.testimonialsTab = $('.testimonials-tabs__item');
APP.calculatorShowBtn = $('.calculator-show');
APP.calculatorClose = $('.calculator-close');


APP.$document.ready(function() {
	APP.calculatorClose.on('click', function() {
		$('.calculator-container').addClass('unfixed');
		$('.main-screen__bg').removeClass('show');
		setTimeout(function (){
		  $('.calculator-container').removeClass('unfixed').removeClass('fixed');
		}, 600);
	})

	APP.calculatorShowBtn.on('click', function() {
		$('.calculator-container').addClass('fixed');
		if($(this).hasClass('main-screen__btn')) {
			$('html').animate({ scrollTop : 0}, 300)
			$('.main-screen__bg').addClass('show');
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