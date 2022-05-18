$(function () {
  $('.select-style, .product__num').styler()

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

  $('.user-nav__inner').hover(function () {
    $('.user-nav__search').toggleClass('user-nav__search--active')
  })
  $('.user-nav__btn--search').click(function () {
    $('.user-nav__search').toggleClass('user-nav__search--active')
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

  $('.star').rateYo({
    starWidth: '16px',
    readOnly: true,
    spacing: '6px',
    normalFill: '#C1C1C1',
    ratedFill: '#FFB800',
    starSvg:
      '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.0229731 6.16432C0.0780978 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322142 6.334 0.0229731 6.16432Z"/></svg>',
  })

  $('.star-sendrating').rateYo({
    rating: 0,
    starWidth: '16px',
    spacing: '6px',
    normalFill: '#C1C1C1',
    ratedFill: '#FFB800',
    starSvg:
      '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.0229731 6.16432C0.0780978 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322142 6.334 0.0229731 6.16432Z"/></svg>',
    onChange: function (rating, rateYoInstance) {
      $(this).next().text(rating)
    },
  })

  $('[data-fancybox="gallery"]').fancybox({
    afterLoad: function (instance, current) {
      var pixelRatio = window.devicePixelRatio || 1

      if (pixelRatio > 1.5) {
        current.width = current.width / pixelRatio
        current.height = current.height / pixelRatio
      }
    },
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

const reviewsSwiper = new Swiper('.reviews-swiper', {
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

const productSwiper = new Swiper('.product-swiper', {
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

const intrestingSwiper = new Swiper('.intresting-swiper', {
  slidesPerView: 2,
  slidesPerGroup: 2,
  loop: true,
  loopFillGroupWithBlank: true,
  spaceBetween: 5,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
  },
  breakpoints: {
    568: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 10,
      loop: true,
      loopFillGroupWithBlank: true,
    },
    768: {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 15,
      loop: true,
      loopFillGroupWithBlank: true,
    },
    992: {
      slidesPerView: 5,
      slidesPerGroup: 1,
      spaceBetween: 30,
      loop: true,
      loopFillGroupWithBlank: true,
    },
  },
})

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector)
  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = 'none'
    })
    tab.forEach((item) => {
      item.classList.remove(activeClass)
    })
  }
  function showTabContent(i = 0) {
    content[i].style.display = display
    tab[i].classList.add(activeClass)
  }
  hideTabContent()
  showTabContent()
  header.addEventListener('click', (e) => {
    const target = e.target
    if (
      target.classList.contains(tabSelector.replace(/\./, '')) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))
    ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })
}

tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active')
