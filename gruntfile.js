module.exports = function(grunt) {

	// Load multiple grunt tasks using globbing patterns
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		cssmin: {
			options: {
				mergeIntoShorthands: false,
			},
			target: {
				files: {
					'style.css': [ 'assets/css/*.css', '!assets/css/*.min.css', '!assets/css/*jquery*.css' ]
				}
			}
		},

		uglify: {
			options: {
				mangle: false,
			},
			target: {
				files: [{
					expand: true,
					cwd: 'assets/js',
					src: [ '*.js', '!*.min.js', '!*jquery*.js' ],
					dest: 'assets/js',
					ext: '.min.js',
					extDot: 'last',
				}]
			}
		},

		// Clean up build directory
		clean: {
			main: ['build/<%= pkg.name %>']
		},

		// Copy the plugin into the build directory
		copy: {
			main: {
				src:  [
					'assets/**',
					'*.php',
					'*.css',
					'*.js',
					'!gruntfile.js',
				],
				dest: 'build/<%= pkg.name %>/'
			}
		},

		// Compress build directory into <name>.zip and <name>-<version>.zip
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './build/<%= pkg.name %>.zip'
				},
				expand: true,
				cwd: 'build/<%= pkg.name %>/',
				src: ['**/*'],
				dest: '<%= pkg.name %>/'
			}
		},

		release: {
			options: {
				npm: false, //default: true
				changelog: true, //default: false
				changelogText: '<%= version %>\n', //default: '### <%= version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'
				beforeBump: [], // optional grunt tasks to run before file versions are bumped
				afterBump: [], // optional grunt tasks to run after file versions are bumped
				beforeRelease: [], // optional grunt tasks to run after release version is bumped up but before release is packaged
				afterRelease: [], // optional grunt tasks to run after release is packaged
			}
		}

	});

	// Build task(s).
	grunt.registerTask( 'build', [ 'cssmin', 'uglify', 'clean', 'copy', 'compress' ] );

};
