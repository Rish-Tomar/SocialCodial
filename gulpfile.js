const gulp = require('gulp')
const gulp_sass= require('gulp-sass')(require('sass'));
const gulp_cssnano = require('gulp-cssnano')
const rev=require('gulp-rev')
const gulp_ugly=require('gulp-uglify-es').default
const del=require('del')
const imagemin=require('gulp-imagemin')

gulp.task('css',function(){
    console.log('minifying CSS')
    gulp.src('./assets/sass/**/*.scss')
    .pipe(gulp_sass())                    
    .pipe(gulp_cssnano())
    .pipe(gulp.dest('./assets.css'))

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    })).pipe(gulp.dest('./public/assets'))
})

gulp.task('js', async function(){
    console.log('minifying js')
    gulp.src('./assets/**/*.js')
    .pipe(gulp_ugly())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    })).pipe(gulp.dest('./public/assets'))
})


gulp.task('images',function(){
    console.log('minifying image')
    gulp.src('./assets/**/*.+(png|gif|svg|jpeg|jpg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    })).pipe(gulp.dest('./public/assets'))
})

gulp.task('clean',function(done){
    del.sync('./public/assets')
    done()
})

gulp.task('build',gulp.series('clean','css','js'),function(){
    console.log('done all')
})