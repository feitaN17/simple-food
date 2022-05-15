$(function () {
  $('.select-style').styler()

  $(window).scroll(function () {
    var target = $(this).scrollTop()

    if (target == 0) {
      $('.header__menu').removeClass('header__menu--fixed')
      $('.menu__btn').css('top', '30px')
    } else {
      $('.header__menu').addClass('header__menu--fixed')
      $('.menu__btn').css('top', '24px')
    }
  })

  $('.menu__btn, .menu__btn2').click(function () {
    $(this).toggleClass('menu__btn--open')
    $('.menu__inner').toggleClass('menu__inner--open')
    $('.wrapper').toggleClass('wrapper--fixed')
  })

  $('.menu__link, .logo, .wrapper--fixed').on('click', function () {
    $('.menu__inner, .menu__btn').removeClass('menu__btn--open , menu__inner--open')
    $('.wrapper').removeClass('wrapper--fixed')
  })

  $('.catalog-btn').on('click', function () {
    $('.catalog-btn').toggleClass('catalog-btn--open')
    $('.filters').toggleClass('filters--open')
    $('.wrapper').toggleClass('wrapper--fixed')
  })

  var instance
  var min = 0
  var max = 1200
  var from = 0
  var to = 0

  $('.filters-price__range').ionRangeSlider({
    type: 'double',
    min: min,
    max: max,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs,
  })

  instance = $('.filters-price__range').data('ionRangeSlider')

  function updateInputs(data) {
    from = data.from
    to = data.to

    $('.filters-price__from').prop('value', from)
    $('.filters-price__to').prop('value', to)
  }

  $('.filters-price__from').on('change', function () {
    var val = $(this).prop('value')

    // validate
    if (val < min) {
      val = min
    } else if (val > to) {
      val = to
    }

    instance.update({
      from: val,
    })

    $(this).prop('value', val)
  })

  $('.filters-price__to').on('change', function () {
    var val = $(this).prop('value')

    // validate
    if (val < from) {
      val = from
    } else if (val > max) {
      val = max
    }

    instance.update({
      to: val,
    })

    $(this).prop('value', val)
  })

  var mixer = mixitup('.popular-catigories__cards')
})

const restaurantsSwiper = new Swiper('.restaurants-swiper', {
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
  },
})

const discountsSwiper = new Swiper('.discounts-swiper', {
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
  },
})

const swiper = new Swiper('.reviews-swiper', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
