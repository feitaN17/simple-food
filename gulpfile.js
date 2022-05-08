const { src, dest, watch, parallel, series } = require('gulp')

const fileInclude = require('gulp-file-include')
const scss = require('gulp-sass')(require('sass'))
const svgSprite = require('gulp-svg-sprite')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const del = require('del')
const browserSync = require('browser-sync').create()

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  })
}

const htmlInclude = () => {
  return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы
    .pipe(
      fileInclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(dest('app')) // указываем, в какую папку поместить готовый файл html
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid: 'true',
      })
    )
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/mixitup/dist/mixitup.min.js',
    'node_modules/swiper/swiper-bundle.min.js',
    'app/js/main.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function svgSprites() {
  return src('app/img/icons/**.svg')
    .pipe(
      cheerio({
        run: ($) => {
          $('[fill]').removeAttr('fill')
          $('[stroke]').removeAttr('stroke')
          $('[style]').removeAttr('style')
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace('&gt;', '>'))

    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', // указываем имя файла спрайта и путь
          },
        },
      })
    )
    .pipe(dest('app/img')) // указываем, в какую папку поместить готовый файл спрайта
}

function img() {
  return src('app/img/**/*.*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('dist/img'))
}

function build() {
  return src(['app/**/*.html', 'app/css/style.min.css', 'app/js/main.min.js'], {
    base: 'app',
  }).pipe(dest('dist'))
}

function clean() {
  return del('dist')
}

function watching() {
  watch(['app/html/**/*.html'], htmlInclude)
  watch(['app/scss/**/*.scss'], styles)
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
  watch(['app/img/icons/*.svg'], svgSprites)
  watch(['app/**/*.html']).on('change', browserSync.reload)
}

exports.htmlInclude = htmlInclude
exports.styles = styles
exports.scripts = scripts
exports.svgSprites = svgSprites
exports.browsersync = browsersync
exports.watching = watching
exports.img = img
exports.clean = clean
exports.build = series(clean, img, build)

exports.default = parallel(svgSprites, htmlInclude, styles, scripts, browsersync, watching)
