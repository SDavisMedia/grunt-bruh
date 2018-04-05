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

		exec: {
			build_it: {
				cmd: 'grunt build' // run the 'grunt build' task
			},
			release_it: {
				cmd: 'release-it' // use Release It to release the build on GitHub
			},
		}

	});

	// Build task(s).
	grunt.registerTask( 'build', [ 'cssmin', 'uglify', 'clean', 'copy', 'compress' ] );

	// Build task(s).
	grunt.registerTask( 'release', [ 'exec' ] );

};
