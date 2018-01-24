const gulp = require('gulp');
const gutil = require('gulp-util');
const coffee = require('gulp-coffeescript');
const compass = require('gulp-compass');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const gulpif = require('gulp-if');
const jsonMinify = require('gulp-json-minify');
const uglify = require('gulp-uglifyes');
const minifyHTML = require('gulp-minify-html');
const imagemin = require('gulp-imagemin');
const pngcrush = require('imagemin-pngcrush');
const browserify = require('gulp-browserify');
const minifyCSS = require('gulp-minify-css');


// Develop files sources

// Set the environment variable
const env = process.env.NODE_ENV || 'development';
let outputDir = '';
let sassStyle = '';
// Set the sources
if (env === 'development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

const coffeeSources = ['components/coffee/tagline.coffee'];
const imageSources = ['builds/development/images/**/*.*'];
const mediaSources = ['builds/development/media/**/*.*'];
const jsSources = [
  'components/scripts/cycle.js',
  'components/scripts/template.js',
  'components/scripts/overlay.js'
];
const sassSources = ['components/sass/style.scss'];
const htmlSources = ['builds/development/*.html'];
const fontSources = ['builds/development/fonts/*.*'];
const jsonSources = ['builds/development/js/*.json'];


/******
  Compress images for production
  Compress images in the builds/development/images folder
  and saves new images in builds/production/images
*/
gulp.task('images', () => {
  gulp.src(imageSources)
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulpif(env === 'production', gulp.dest(`${outputDir}images`)))
    .pipe(connect.reload());
});

// Fonts task
gulp.task('fonts', () => {
  gulp.src(fontSources)
    // In production, copy fonts to production/fonts folder
    .pipe(gulpif(env === 'production', gulp.dest(`${outputDir}fonts`)))
    .pipe(connect.reload());
});

// Coffee tasks
gulp.task('coffee', () => {
  gulp.src(coffeeSources)
    // Process coffee scripts
    .pipe(coffee({ bare: true }).on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
});

// Javascript tasks
gulp.task('js', () => gulp.src(jsSources)
    // Combine Javascript files
    .pipe(concat('script.js'))
    // Connect to required resources
    .pipe(browserify())
    // In production, compress the javascript files
    .pipe(gulpif(env === 'production', uglify()))
    .on('error', gutil.log)
    // In development, copy javascript to development/js
    // In production, copy compressed javascript to production/js
    .pipe(gulp.dest(`${outputDir}js`))
    .pipe(connect.reload()));

// SASS files task
gulp.task('compass', () => {
  gulp.src(sassSources)
    // In development, build the CSS files
    .pipe(compass({
      sass: 'components/sass',
      image: `${outputDir}images`,
      style: sassStyle
    })
    .on('error', gutil.log))
    // In production, minify CSS and
    .pipe(gulpif(env === 'production', minifyCSS()))
    .pipe(gulp.dest(`${outputDir}css`))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src(htmlSources)
    // In production, minify HTML files and copy to production root folder
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload());
});

// JSON files task
gulp.task('json', () => {
  gulp.src(jsonSources)
    // In production, compress the JSON files
    .pipe(jsonMinify())
      // In production, copy JSON files to production/json folder
    .pipe(gulpif(env === 'production', gulp.dest(`${outputDir}js`)))
    .pipe(connect.reload());
});

// Media files task
gulp.task('media', () => {
  gulp.src(mediaSources)
      // In production, copy the files to the production/media folder
    .pipe(gulpif(env === 'production', gulp.dest(`${outputDir}media`)))
    .pipe(connect.reload());
});

// Connect to live server
gulp.task('connect', () => {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

// Watch for changes to development files
gulp.task('watch', () => {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
  gulp.watch(imageSources, ['images']);
  gulp.watch(fontSources, ['fonts']);
  gulp.watch(mediaSources, ['media']);
});

// Run default tasks
gulp.task('default', ['json', 'images', 'media', 'fonts', 'html', 'coffee',
'compass', 'js', 'connect', 'watch']);
