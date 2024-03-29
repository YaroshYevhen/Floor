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
APP.sliderDots = $('.slider-dots');
APP.closeModal = $('.modal-close');
APP.modalStar = $('.modal-stars__item');
APP.dropdownItem = $('.calculator-select__li');
APP.calculatorService = $('.calculator-service__item');
APP.inputFile = $('#wpmtst_featured_image');

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $('.input-file__btn')
            .css("background-image", ("url(" + e.target.result + ")"));
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function fillCalculatorForm() {
	$('.calculator-select__current').each(function() {
		let target = $(this).data('target');
		let value = $(this).find('span').text();

		$(target).val(value);
	})
	$('#wpforms-187-field_2').val($('.calculator-service__item.current').text());
	$('#wpforms-187-field_6').val($('.calculator-size .number').text());
}

function fillWpForm(element) {
  var target = $(element).data('target'),
      thisVal = $(element).val();
  
  if($(element).hasClass('js-text')){
    $(target).text(thisVal);
	} else if($(element).hasClass('calculator-select__current')) {
		$(target).text($(element).find('span').text());
	} else {
    $(target).val(thisVal);
  }
}

function modalStarsText(star) {
	let textOutput = $('.modal-stars__text');

	if($(star).index('.modal-stars__item') === 0) {
			textOutput.text('Очень плохо.')
		} else if($(star).index('.modal-stars__item') === 1) {
			textOutput.text('Плохо.')
		} else if($(star).index('.modal-stars__item') === 2) {
			textOutput.text('Нормально.')
		} else if($(star).index('.modal-stars__item') === 3) {
			textOutput.text('Хорошо.')
		} else if($(star).index('.modal-stars__item') === 4) {
			textOutput.text('Отлично!')
		}
}

function closeModal() {
  $('.modal').scrollTop(0).removeClass('active');
  $('.modal input').removeClass('error');
  APP.modalStar.removeClass('active');
  $('.modal-stars__container').removeClass('active');
  $('.modal-stars__text').text('');
  $('.modal').find('textarea, input').val('');
  if(!$('body').hasClass('menu')) {
  	$('html').removeClass('overflow');
	}
	$('.modal[data-target="testimonial-full"] .modal-container').html('<div class="modal-close"></div>');
}

function dotsChange(slider) {
	let dots = $(slider).find('.slider-dots');
	let currentSlideIndex = $(slider).hasClass('gallery-slider')? 
			$(slider).find('.slider-item.second').data('index') : 
			$(slider).find('.slider-item.first').data('index');

	dots.find('.slider-dots__item.current').removeClass('current');
	dots.find('.slider-dots__item[data-index="' + currentSlideIndex + '"]').addClass('current');
}

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

window.onload = function() {
  $('.preloader').fadeToggle(500);

  $('html').removeClass('overflow');
};

APP.$document.ready(function() {
	
	
	fillWpForm($('.js-change'));
	fillCalculatorForm();

	$('.testimonials-slide__more').each(function() {
		if($(this).parents('.testimonials-slide').find('.testimonials-slide__text p').height() < 145) {
			$(this).hide();
		}
	})

	$(document).on('click', '.gallery-slide__socials > div', function() {
		$(this).parents('.gallery-slide__socials').toggleClass('show');
	})

	APP.inputFile.on('change', function(event) {
    var file = event.target.files[0],
        fileName = file.name,
        replace = fileName.replace(/\s/g,'_');

    if(file) {
      $('.file-label').addClass('file');
    } else {
      $('.file-label').removeClass('file');
    }
    $('.input-file__text').html(replace);
    readURL(this);
  });

  $('.file-label').on('click', function(event) {
    if($(this).hasClass('file')) {
      event.preventDefault();
      $('.input-file__text').text('Прикрепить фото');
    APP.inputFile.val('');
    $('.file-label').removeClass('file');
    $('.input-file__btn').css("background-image", "");
    }
  });

	if((($('.masters-item').length < 5) && ($(window).width() > 1199)) || (($('.masters-item').length < 4) && ($(window).width() <= 1199))) {
		$('.masters__btn').hide();
	}

	$('.masters__btn').on('click', function() {
		$('.masters-item').show();
		$(this).hide();
	})

	$('input').on('blur', function() {
		if($('.calculator-container').hasClass('fixed')) {
			$('html, body').scrollTop(0);
		}
	})
	$('input').on('change', function() {
		if($('.calculator-container').hasClass('fixed')) {
			$('html, body').scrollTop(0);
		}
	})

	jQuery('.slider-container').swipe( {
    swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection)
    {
        if (phase=="start"){
            // сработает в начале swipe
        } 
        if (phase=="end"){ 
            //сработает через 20 пикселей то число которое выбрали в threshold
            if (direction == 'left') {
			        $(this).find('.slider-arrow_next').click();
            }
            if (direction == 'right') {
			        $(this).find('.slider-arrow_prev').click();
            }
            if (direction == 'up') {
                //сработает при движении вверх
            }
            if (direction == 'down') {
                //сработает при движении вниз
            }
        }
	 },
	 triggerOnTouchEnd:false,
	 threshold:20 // сработает через 20 пикселей
	});

	$('.js-change').on('keyup', function(){
    fillWpForm(this)
	});
	
	$(document).on('click', '.submit-btn', function() {
		let target = $(this).data('target');
		let parent = $(this).parents('.modal-container, .calculator-container');
    let requiredInput = parent.find('input.required, textarea.required');

    if($(this).hasClass('calculator__btn')) {
    	fillCalculatorForm();
    }
		$(target).click();
		if(!requiredInput.val()) {
      requiredInput.css({'border-color' : '#e21e1e'});
		}
		if($(this).hasClass('calculator__btn') && !$('.calculator-service__item.current').length) {
			$('.calculator-service').css({'border-color' : '#e21e1e'});
		}
	})

  APP.calculatorService.on('click', function() {
  	let choise = $(this).data('choise');

  	$('.calculator-service__item.current').removeClass('current');
  	$(this).addClass('current');
  	if(choise === 'right') {
  		$('.calculator-service__select .selector').css({'left' : '39px'});
  	} else if(choise === 'left') {
  		$('.calculator-service__select .selector').css({'left' : '-38px'});
  	}
  })

  APP.dropdownItem.on('click', function() {
		let text = $(this).text();
		let currentChoice = $(this).parents('.calculator-select').find('.calculator-select__current span');

		currentChoice.text(text);
		$('.calculator-select__li.current').removeClass('current');
		$(this).addClass('current');
		$(this).parents('.calculator-select').find('.calculator-select__current').removeClass('active');
	})

  APP.modalStar.on('click', function() {
		let target = $(this).data('target');

		$(target).click();
  	$('.modal-stars__item.active').removeClass('active');
  	$(this).addClass('active');
  	$(this).parents('.modal-stars__container').addClass('active');
  })

	APP.modalStar.on('mouseenter', function() {
		modalStarsText(this);
	})

	APP.modalStar.on('mouseleave', function() {
		let textOutput = $('.modal-stars__text');

		if(!$('.modal-stars__container').hasClass('active')) {
			textOutput.text('');
		} else {
			modalStarsText($('.modal-stars__item.active'));
		}
	});

	$(document).on('click', '.modal-btn', function() {
    let attr = $(this).attr('data-target');
    let modal = $('.modal[data-target="' + attr + '"]');

    
    $('html').addClass('overflow');
    if($(this).hasClass('products-item__btn')) {
    	let title = $(this).parents('.products-item').find('.products-item__name').text();

    	modal.find('textarea').val('Хочу приобрести смесь ' + title + '.');
		} else if($(this).hasClass('testimonials-slide__more')) {
			let parent = $(this).parents('.testimonials-slide');
			let image = parent.find('.testimonials-slide__img').clone();
			let stars = parent.find('.testimonials-slide__stars').clone();
			let text = parent.find('.testimonials-slide__text').clone();
			let author = parent.find('.testimonials-slide__author').clone();

			modal.find('.modal-container').append(image, stars, text, author);
		}
		
		modal.addClass('active');
  });

	$(document).on('click', '.modal-close', function() {
    closeModal();
  });

  $('.modal').on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

  $(document).keyup(function(e) { 
    if (e.keyCode == 27) { 
      closeModal();
    } 
  });

	APP.sliderDots.each(function() {
		let slider = $(this).parents('.slider-container');
		let slide = slider.find('.slider-item');
		let dots = $(this);

		slide.each(function(key) {
			let dot = '<span class="slider-dots__item" ' + 'data-index="' + (key + 1) + '"></span>';
			if (key === 0) {
				dot = '<span class="slider-dots__item current" ' + 'data-index="' + (key + 1) + '"></span>';
			}
			dots.append(dot);
		})
	})

	$('.slider-dots__item').on('click', function() {
		let slider = $(this).parents('.slider-container');
		let currentIndex = slider.find('.slider-dots__item.current').data('index');
		let targetIndex = $(this).data('index');

		let diff;
		if(currentIndex < targetIndex) {
			diff = targetIndex - currentIndex;
			while(diff > 0) {
				diff--;
				setTimeout(function (){
					slider.find('.slider-arrow_next').click();
				}, (diff * 100));
			}
		} else if(currentIndex > targetIndex) {
			diff = currentIndex - targetIndex;
				while(diff > 0) {
					diff--;
					setTimeout(function (){
						slider.find('.slider-arrow_prev').click();
					}, (diff * 100));
				}
			}
	})

	

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

    if($(this).hasClass('services-item__btn')) {
    	let value = $(this).data('value');

    	$('.calculator-service__select .selector').css({'left' : '-38px'});
    	$('.calculator-service__item[data-choise="left"]').addClass('current');
    	$( '#slider' ).slider( "option", "values", [ value ] );
    	$('#custom-handle .number').text(value);
    }

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
			 (slider.hasClass('gallery-slider') && slidesCount < 2) || ($(window).width() > 767) && (slider.hasClass('testimonials-slider') && slidesCount < 2) || 
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

			dotsChange(slider);
			$('.gallery-slide__socials.show').removeClass('show');
	})
})

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+38 (0__) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

});