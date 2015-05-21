"use strict";
var $, gulp, haml, handleError, options, path, sass, connect;

handleError = function(err) {
    console.warn(err);
    return this.emit("end");
};

gulp = require("gulp");
path = require("path");
sass = require('gulp-ruby-sass');
haml = require('gulp-haml-coffee');
connect = require('gulp-connect')

$ = require("gulp-load-plugins")();


gulp.task("sass", function() {
    return sass('./app/scss/application.scss')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload()).on("error", $.util.log);
});

gulp.task("haml", function() {
    gulp.src("app/*.haml")
        .pipe(haml())
        .pipe(gulp.dest("./app"))
        .pipe(connect.reload()).on("error", $.util.log);
});

gulp.task("connect", function() {
    connect.server({
        root: ["app"],
        port: 9000,
        livereload: true
    });
});


gulp.task("watch", ["haml", "sass", "connect"], function() {
    gulp.watch("app/*.haml", ["haml"]);
    gulp.watch("app/scss/**/*.scss", ["sass"]);
});


gulp.task("default", function() {
    gulp.start("watch");
});
