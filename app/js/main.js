$(function () {
  $(window).scroll(function () {
    var target = $(this).scrollTop()

    if (target == 0) {
      $('.header__menu').removeClass('header__menu--fixed')
      $('.menu__btn').css('top', '30px')
    } else {
      $('.header__menu').addClass('header__menu--fixed')
      $('.menu__btn').css('top', '20px')
    }
  })

  $('.menu__btn, .menu__btn2').click(function () {
    $(this).toggleClass('menu__btn--open')
    $('.menu__inner').toggleClass('menu__inner--open')
    $('.wrapper').toggleClass('wrapper--fixed')
  })
  $('.menu__link, .logo').on('click', function () {
    $('.menu__inner, .menu__btn').removeClass('menu__btn--open , menu__inner--open')
    $('.wrapper').removeClass('wrapper--fixed')
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

  var mixer = mixitup('.popular-catigories__cards')
})

const swiper2 = new Swiper('.reviews-swiper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
