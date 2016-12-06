"use strict";

const gulp = require("gulp");
const del = require("del");
const webpack = require("webpack-stream");
const runSequence = require("run-sequence");
const gutil = require("gulp-util");
const path = require("path");
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
const concatCSS = require("gulp-concat-css");

const DIST_DIR = "./public/dist";
const SRC_DIR = "./public/src";

gulp.task("clean", () => {
  return del([`${DIST_DIR}/**/*`]);
});

gulp.task("sass", () => {
  return gulp.src(`${SRC_DIR}/sass/**/*.scss`)
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(concatCSS("app.min.css"))
    .pipe(gulp.dest(`${DIST_DIR}/css`));
});

gulp.task("webpack", () => {
  return gulp.src(`${SRC_DIR}/js/app.js`)
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(`${DIST_DIR}/js`));
});

gulp.task("watch", ["build"], () => {
  const fileChanged = file => {
    let filePath = path.relative(__dirname, file.path);
  };

  gulp.watch([`${SRC_DIR}/js/**/*.js`], ["webpack"]).on("change", fileChanged);
  gulp.watch([`${SRC_DIR}/sass/**/*.scss`], ["sass"]).on("change", fileChanged);
});

gulp.task("build", callback => {
  runSequence(
    "clean",
    ["webpack", "sass"],
    callback
  );
});

gulp.task("default", ["build"]);
