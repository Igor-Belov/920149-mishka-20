const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    // .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename ("style.min.css"))
    // .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// optimization images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}
exports.images = images;

// create webp files.

const createwebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.webp = createwebp;

// create SVG sprite.

const sprite = () => {
  return gulp.src(["build/img/**/icon-*.svg", "build/img/logo-htmlacademy.svg"])
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

//copy file tree

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"))
}

exports.copy = copy;

//copy and min html

const html = () => {
  return gulp.src([
    "source/*.html"
  ], {
  base: "source"
  })
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest("build"))
}

exports.html = html;

//copy and min and build in one file js

const minjs = () => {
  return gulp.src([
    "source/js/**/*.js"
  ], {
  base: "source"
  })
  .pipe(uglify(/* options */))
  .pipe(concat('app.js'))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.minjs = minjs;

// delete "build"

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/**/*.js", gulp.series("minjs"))
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.watcher = watcher;

const build = gulp.series(clean, copy, styles, images, createwebp, sprite, html, minjs);

exports.build = build;

exports.default = gulp.series(build, server, watcher);
