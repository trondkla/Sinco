var gulp = require('gulp'),
  less = require('gulp-less'),
  refresh = require('gulp-livereload'),
  concat = require('gulp-concat'),
  lr = require('tiny-lr')(),
  ecstatic = require('ecstatic'),
  http = require('http'),
  lrport = 35729,
  devport = 1337;

gulp.task('less', function(){
  gulp.src([
      'less/variables.less',
      'less/mixins.less',
      'less/*.less',
      'less/site/*.less'
    ])
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css/'))
    .pipe(refresh(lr));;
});

gulp.task('watch', function() {
  gulp.start('less');

  http.createServer(
    ecstatic({
      root: __dirname + '/public/',
      autoIndex: true
    })
  ).listen(devport);
  lr.listen(lrport, function(err) {
    if(err) return console.log(err);

    gulp.watch('less/**/*.less', function() {
      gulp.start('less');
    });

    gulp.watch(['public/index.html'], function (e) {
      lr.changed({body: {files: e.path}});
    })

  })
});
