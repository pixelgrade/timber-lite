/**
 * This file contains development tasks used to compile and concatenate
 * scripts and stylesheets
 *
 * @version 1.0.0
 */

var gulp = require( 'gulp' ),
	plugins = require('gulp-load-plugins')(),
	del = require('del'),
	bs = require('browser-sync'),
	argv = require('yargs').argv;

var u = plugins.util,
	c = plugins.util.colors,
	log = plugins.util.log

// -----------------------------------------------------------------------------
// Stylesheets
// -----------------------------------------------------------------------------

function logError (err, res) {
	log(c.red('Sass failed to compile'))
	log(c.red('> ') + err.file.split('/')[err.file.split('/').length - 1] + ' ' + c.underline('line ' + err.line) + ': ' + err.message)
}

function stylesMain() {
	let variation = 'timber-lite'

	if (argv.variation !== undefined) {
		variation = argv.variation
	}

	return gulp.src('assets/scss/**/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', logError))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.replace(/^@charset \"UTF-8\";\n/gm, ''))
		.pipe(gulp.dest('.'))
}
stylesMain.description = 'Compiles main css files (ie. style.css editor-style.css)';
gulp.task('styles-main', stylesMain )

function stylesRtl() {
	return gulp.src('style.css')
		.pipe(plugins.rtlcss())
		.pipe(plugins.rename('style-rtl.css'))
		.pipe(gulp.dest('.'))
}
stylesRtl.description = 'Generate style-rtl.css file based on style.css';
gulp.task('styles-rtl', stylesRtl )

function stylesProcess() {
	return gulp.src('style.css')
		.pipe(plugins.sourcemaps.init({loadMaps: true}))
		// @todo some processing
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('.'))
}
gulp.task('styles-process', stylesProcess)

function stylesAdmin() {

  return gulp.src('inc/admin/scss/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.replace(/^@charset \"UTF-8\";\n/gm, ''))
    .pipe(gulp.dest('./inc/admin/css'))
}
stylesAdmin.description = 'Compiles WordPress admin Sass and uses autoprefixer';
gulp.task('styles-admin', stylesAdmin )

function stylesPixassistNotice() {

  return gulp.src('inc/admin/pixelgrade-assistant-notice/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.replace(/^@charset \"UTF-8\";\n/gm, ''))
    .pipe(gulp.dest('./inc/admin/pixelgrade-assistant-notice'))
}
stylesAdmin.description = 'Compiles Pixelgrade Assistant admin notice Sass and uses autoprefixer';
gulp.task('styles-pixassist-notice', stylesPixassistNotice )

function stylesSequence(cb) {
	gulp.series( 'styles-main', 'styles-rtl', 'styles-pixassist-notice', 'styles-admin')(cb);
}
stylesSequence.description = 'Compile the styles and generate RTL version.';
gulp.task('styles', stylesSequence )

// -----------------------------------------------------------------------------
// Scripts
// -----------------------------------------------------------------------------

jsFiles = [
  './assets/js/vendor/*.js',
  './assets/js/main/wrapper-start.js',
  './assets/js/modules/*.js',
  './assets/js/main/main.js',
  './assets/js/main/unsorted.js',
  './assets/js/main/wrapper-end.js'
];

function scripts() {
  return gulp.src(jsFiles, { allowEmpty: true })
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.prettier())
    .pipe(gulp.dest('./assets/js/'))
    .pipe(plugins.terser())
    .pipe(plugins.rename('main.min.js'))
    .pipe(gulp.dest('./assets/js/'))
}
scripts.description = 'Concatenate all JS into main.js and wrap all code in a closure';
gulp.task('scripts', scripts )

// -----------------------------------------------------------------------------
// Watch tasks
//
// These tasks are run whenever a file is saved. Don't confuse the files being
// watched (gulp.watch blobs in this task) with the files actually operated on
// by the gulp.src blobs in each individual task.
//
// A few of the performance-related tasks are excluded because they can take a
// bit of time to run and don't need to happen on every file change. If you want
// to run those tasks more frequently, set up a new watch task here.
// -----------------------------------------------------------------------------

function watchStart() {
	let variation = 'timber-lite'

	if (argv.variation !== undefined) {
		variation = argv.variation
	}

	// watch for theme related CSS changes
	gulp.watch( ['assets/scss/**/*.scss'], stylesMain )

	// watch for JavaScript changes
	gulp.watch('assets/js/**/*.js', scripts)
}
watchStart.description = 'Watch for changes to various files and process them';
gulp.task( 'watch-start', watchStart )

function watchSequence(cb) {
	return gulp.series( 'compile', 'watch-start' )(cb);
}
watchSequence.description = 'Compile and watch for changes to various JSON, SCSS and JS files and process them';
gulp.task( 'watch', watchSequence )

// -----------------------------------------------------------------------------
// Browser Sync using Proxy server
//
// Makes web development better by eliminating the need to refresh. Essential
// for CSS development and multi-device testing.
//
// This is how you'd connect to a local server that runs itself.
// Examples would be a PHP site such as Wordpress or a
// Drupal site, or a node.js site like Express.
//
// Usage: gulp browser-sync-proxy --port 8080
// -----------------------------------------------------------------------------

function browserSync() {
	bs({
		// Point this to your pre-existing server.
		proxy: config.baseurl + (
			u.env.port ? ':' + u.env.port : ''
		),
		files: ['*.php', 'style.css', 'assets/js/*.js'],
		// This tells BrowserSync to auto-open a tab once it boots.
		open: true
	}, function (err, bs) {
		if (err) {
			console.log(bs.options)
		}
	})
}
gulp.task('browser-sync', browserSync )
