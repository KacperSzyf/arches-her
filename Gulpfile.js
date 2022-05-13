// Imports.
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');
const liveReload = require('tiny-lr')
const express = require('express')
const connectLivereload = require('connect-livereload')
const path = require('path')

const project_root = '.'
const css_out = `${project_root}/arches_her/media/css/`
const sass_globs = ['scss/**/*.scss']
const reload_globs = [`${css_out}**/*.css`, `${project_root}/static_html/index.html`]

const EXPRESS_PORT = 4000
const LIVERELOAD_PORT = 35729

gulp.task('start-livereload', () => {
  
  // Start the reload server.
  const lr = liveReload()
  lr.listen(LIVERELOAD_PORT)
  
  return gulp.watch(reload_globs, (event) => {

    // `gulp.watch()` events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = path.relative(project_root, event.path)
    lr.changed({
      body: {
        files: [fileName]
      }
    })
  })
})

gulp.task('start-server', () => {
  var app = express();
  app.use(connectLivereload());
  app.use(express.static(project_root));
  app.listen(EXPRESS_PORT);
})
  

gulp.task('styles', () => gulp.src(sass_globs)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(css_out))
);

// Watch task
gulp.task('watch-styles',() => 
  gulp.watch(sass_globs,['styles'])
);

gulp.task('default', ['styles', 'start-server', 'start-livereload', 'watch-styles']);
