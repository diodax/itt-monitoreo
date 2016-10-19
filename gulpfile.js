var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var del = require('del');


gulp.task('runNodemon',function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 1337
        },
        ignore: ['./node_modules/**']
    }).on('restart', function () {
        console.log('Restarting');
        del([
            './.tmp'
        ]);
    });
});

gulp.task('clean:tmp', function () {
    return del([
        './.tmp'
    ]);
});

gulp.task('default', ['clean:tmp','runNodemon']);
