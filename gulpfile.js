const { src, dest, watch, parallel, series } = require("gulp");

const fileInclude = require("gulp-file-include");
const scss = require("gulp-sass")(require("sass"));
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

const htmlInclude = () => {
  return src(["app/html/*.html"]) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest("app")) // указываем, в какую папку поместить готовый файл html
    .pipe(browserSync.stream());
};

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["node_modules/jquery/dist/jquery.js", "app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function svgSprites() {
  return (
    src("app/images/icons/*.svg") // выбираем в папке с иконками все файлы с расширением svg
      // .pipe(
      //   cheerio({
      //     run: ($) => {
      //       $("[fill]").removeAttr("fill"); // очищаем цвет у иконок по умолчанию, чтобы можно было задать свой
      //       $("[stroke]").removeAttr("stroke"); // очищаем, если есть лишние атрибуты строк
      //       $("[style]").removeAttr("style"); // убираем внутренние стили для иконок
      //     },
      //     parserOptions: { xmlMode: true },
      //   })
      // )
      // .pipe(replace("&gt;", ">")) // боремся с заменой символа
      .pipe(
        svgSprite({
          mode: {
            stack: {
              sprite: "../sprite.svg", // указываем имя файла спрайта и путь
            },
          },
        })
      )
      .pipe(dest("app/images"))
  ); // указываем, в какую папку поместить готовый файл спрайта
}

function images() {
  return src("app/images/**/*.*")
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
    .pipe(dest("dist/images"));
}

function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], {
    base: "app",
  }).pipe(dest("dist"));
}

function clean() {
  return del("dist");
}

function watching() {
  watch(["app/html/**/*.html"], htmlInclude);
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/images/icons/*.svg"], svgSprites);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.svgSprites = svgSprites;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.clean = clean;
exports.build = series(clean, images, build);

exports.default = parallel(
  svgSprites,
  htmlInclude,
  styles,
  scripts,
  browsersync,
  watching
);
