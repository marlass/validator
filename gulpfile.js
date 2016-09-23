const compiler = require('google-closure-compiler-js').gulp();
const gulp = require('gulp');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');

gulp.task('script',['lint'], function() {
  return gulp.src('./src/index.js', {base: './'})
      // your other steps here
      .pipe(compiler({
          compilationLevel: 'ADVANCED',
          warningLevel: 'VERBOSE',
          outputWrapper: '(function(){\n%output%\n}).call(this)',
          jsOutputFile: 'validator.min.js',  // outputs single file
          createSourceMap: true,
        }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['script'], function() {

});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['test']);
});

gulp.task('default',['watch']);
