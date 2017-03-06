var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	exec = require('gulp-exec'),
	replace = require('gulp-replace'),
	clean = require('gulp-clean'),
	minify = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	beautify = require('gulp-beautify'),
	csscomb = require('gulp-csscomb'),
	prompt = require('gulp-prompt'),
	cmq = require('gulp-combine-media-queries'),
	fs = require('fs');

jsFiles = [
	'./assets/js/vendor/*.js',
	'./assets/js/main/wrapper_start.js',
	'./assets/js/main/shared_vars.js',
	'./assets/js/modules/*.js',
	'./assets/js/main/main.js',
	'./assets/js/main/functions.js',
	'./assets/js/main/wrapper_end.js'
];


var theme_name = 'timber',
	main_branch = 'timber',
	options = {
		silent: true,
		continueOnError: true // default: false
	};

gulp.task('styles', function () {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass({'sourcemap=none': true, style: 'expanded'}))
		.pipe(prefix("last 3 versions", "> 1%", "ie 8", "ie 7"))
		// .pipe(cmq())
		.pipe(csscomb())
		.pipe(gulp.dest('./', {"mode": "0644"}))
		.pipe(notify({message: 'Styles task complete'}));
});

gulp.task('styles-watch', function () {
	livereload.listen();
	return gulp.watch('assets/scss/**/*.scss', ['styles']);
});


// javascript stuff
gulp.task('scripts', function () {
	return gulp.src(jsFiles)
		.pipe(concat('main.js'))
		.pipe(beautify({indentSize: 2}))
		.pipe(gulp.dest('./assets/js/', {"mode": "0644"}));
});

gulp.task('scripts-watch', function () {
	livereload.listen();
	return gulp.watch('assets/js/**/*.js', ['scripts']);
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('assets/scss/**/*.scss', ['styles']);
	gulp.watch('assets/js/**/*.js', ['scripts']);
});

// styles related
gulp.task('styles-admin', function () {
	return gulp.src('./assets/scss/admin/*.scss')
		.pipe(sass({sourcemap: false, style: 'expanded'}))
		.on('error', function (e) {
			console.log(e.message);
		})
		.pipe(prefix("last 3 versions", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest('./assets/css/admin/', {"mode": "0644"}));
});

// usually there is a default task for lazy people who just wanna type gulp
gulp.task('start', ['styles', 'scripts'], function () {
	// silence
});

gulp.task('server', ['styles', 'scripts'], function () {
	console.log('The styles and scripts have been compiled for production! Go and clear the caches!');
});


/**
 * Copy theme folder outside in a build folder, recreate styles before that
 */
gulp.task('copy-folder', function () {

	return gulp.src('./')
		.pipe(exec('rm -Rf ./../build; mkdir -p ./../build/timber; rsync -av --exclude="node_modules" ./* ./../build/timber/', options));
});

/**
 * Clean the folder of unneeded files and folders
 */
gulp.task('build', ['copy-folder'], function () {

	// files that should not be present in build
	files_to_remove = [
		'**/codekit-config.json',
		'node_modules',
		'config.rb',
		'gulpfile.js',
		'package.json',
		'pxg.json',
		'build',
		'css',
		'.idea',
		'.travis.yml',
		'**/.svn*',
		'**/*.css.map',
		'**/.sass*',
		'.sass*',
		'**/.git*',
		'*.sublime-project',
		'*.sublime-workspace',
		'.DS_Store',
		'**/.DS_Store',
		'__MACOSX',
		'**/__MACOSX',
		'README.md'
	];

	files_to_remove.forEach(function (e, k) {
		files_to_remove[k] = '../build/timber/' + e;
	});

	return gulp.src(files_to_remove, {read: false})
		.pipe(clean({force: true}));
});

/**
 * Create a zip archive out of the cleaned folder and delete the folder
 */
gulp.task('zip', ['build'], function () {

	var versionString = '';
	//get theme version from styles.css
	var contents = fs.readFileSync("./style.css", "utf8");

	// split it by lines
	var lines = contents.split(/[\r\n]/);

	function checkIfVersionLine(value, index, ar) {
		var myRegEx = /^[Vv]ersion:/;
		if (myRegEx.test(value)) {
			return true;
		}
		return false;
	}

	// apply the filter
	var versionLine = lines.filter(checkIfVersionLine);

	versionString = versionLine[0].replace(/^[Vv]ersion:/, '').trim();
	versionString = '-' + versionString.replace(/\./g, '-');

	return gulp.src('./')
		.pipe(exec('cd ./../; rm -rf Timber*.zip; cd ./build/; zip -r -X ./../Timber-Installer' + versionString + '.zip ./timber; cd ./../; rm -rf build'));

});

// usually there is a default task  for lazy people who just wanna type gulp
gulp.task('default', ['start'], function () {
	// silence
});

gulp.task('update-demo', function () {

	var run_exec = require('child_process').exec;

	gulp.src('./')
		.pipe(prompt.confirm( "This task will stash all your local changes without commiting them,\n Make sure you did all your commits and pushes to the main " + main_branch + " branch! \n Are you sure you want to continue?!? "))
		.pipe(prompt.prompt({
			type: 'list',
			name: 'demo_update',
			message: 'Which demo would you like to update?',
			choices: ['cancel', 'test.demos.pixelgrade.com/' + theme_name, 'demos.pixelgrade.com/' + theme_name]
		}, function(res){

			if ( res.demo_update === 'cancel' ) {
				console.log( 'No hard feelings!' );
				return false;
			}

			console.log('This task may ask for a github user / password or a ssh passphrase');

			if ( res.demo_update === 'test.demos.pixelgrade.com/' + theme_name ) {
				run_exec('git fetch; git checkout test; git pull origin ' + main_branch + '; git push origin test; git checkout ' + main_branch + ';', function (err, stdout, stderr) {
					// console.log(stdout);
					// console.log(stderr);
				});
				console.log( " ==== The master branch is up-to-date now. But is the CircleCi job to update the remote test.demo.pixelgrade.com" );
				return true;
			}


			if ( res.demo_update === 'demos.pixelgrade.com/' + theme_name ) {
				run_exec('git fetch; git checkout master; git pull origin test; git push origin master; git checkout ' + main_branch + ';', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				});

				console.log( " ==== The master branch is up-to-date now. But is the CircleCi job to update the remote demo.pixelgrade.com" );
				return true;
			}
		}));
});

/**
 * Short commands help
 */
gulp.task('help', function () {

	var $help = '\nCommands available : \n \n' +
		'=== General Commands === \n' +
		'start                  (default)Compiles all styles and scripts and makes the theme ready to start \n' +
		'zip                    Generate the zip archive \n' +
		'build                  Generate the build directory with the cleaned theme \n' +
		'help                   Print all commands \n' +
		'=== Style === \n' +
		'styles                 Compiles styles in production mode\n' +
		'=== Scripts === \n' +
		'scripts                Concatenate all js scripts \n' +
		'=== Watchers === \n' +
		'watch                  Watches all js and scss files \n' +
		'styles-watch           Watch only styles\n' +
		'scripts-watch          Watch scripts only \n';

	'=== CircleCI Scripts === \n' +
	'update-demo-test       Watches all js and scss files \n' +
	'update-demo-production Watch only styles\n';

	console.log($help);
});