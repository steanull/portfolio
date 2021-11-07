let projectFolder = "dist";
let sourceFolder = "src";
let fs = require('fs');

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/",
    },

    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/styles/style.scss",
        js: sourceFolder + "/scripts/script.js",
        img: sourceFolder + "/images/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: sourceFolder + "/fonts/*.ttf",
    },

    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/styles/**/*.scss",
        js: sourceFolder + "/scripts/**/*.js",
        img: sourceFolder + "/images/**/*.+(png|jpg|gif|ico|svg|webp)"
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    groupMedia = require("gulp-group-css-media-queries"),
    cleanCss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    realFavicon = require('gulp-real-favicon');

// Favicon-Generator
let FAVICON_DATA_FILE = 'faviconData.json';

gulp.task('generate-favicon', function (done) {
    realFavicon.generateFavicon({
        masterPicture: (sourceFolder + '/images/master-picture.png'),
        dest: (projectFolder + '/img/icons/'),
        iconsPath: '/img/icons/',
        design: {
            ios: {
                masterPicture: {
                    type: 'inline',
                    content: 'iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAACXBIWXMAAbX+AAG1/gGKDJn5AAAGv2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuN2E3YTIzNiwgMjAyMS8wOC8xMi0wMDoyNToyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0xMS0wNlQxMzo1MzoxNiswMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTEtMDZUMTQ6MDg6NTUrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMTEtMDZUMTQ6MDg6NTUrMDM6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZGE0ZjI2NGQtZGVhZS03ODRiLWI0OWQtNWFlNTgxMmEzMjk1IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OGIxMGQzYWEtNzIzNi0wMjRlLTkyZmYtMGQ3YmMzODI5ODQ5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OGE4ODUxYzQtNzJjNi1jNTRmLThlNzYtYmE4MjViMjJkMmZmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4YTg4NTFjNC03MmM2LWM1NGYtOGU3Ni1iYTgyNWIyMmQyZmYiIHN0RXZ0OndoZW49IjIwMjEtMTEtMDZUMTM6NTM6MTYrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjI4MzgwMzMtZTE0ZC02YTQ0LThhMzctMjlhMDkxZTFiZGQyIiBzdEV2dDp3aGVuPSIyMDIxLTExLTA2VDE0OjA4OjU1KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmRhNGYyNjRkLWRlYWUtNzg0Yi1iNDlkLTVhZTU4MTJhMzI5NSIgc3RFdnQ6d2hlbj0iMjAyMS0xMS0wNlQxNDowODo1NSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psytq6cAABzMSURB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'
                },
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {
                design: 'raw'
            },
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#775454',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    name: 'Steanull',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#775454'
            }
        },
        settings: {
            compression: 2,
            scalingAlgorithm: 'Lanczos',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function () {
        done();
    });
});

gulp.task('inject-favicon-markups', function () {
    return gulp.src([sourceFolder + '/*.html'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('sourceFolder'));
});

gulp.task('check-for-favicon-update', function (done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function (err) {
        if (err) {
            throw err;
        }
    });
});


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({outputStyle: 'expanded'}).on('error', scss.logError)
        )
        .pipe(
            groupMedia()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function () {
    return src([sourceFolder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(sourceFolder + '/fonts/'));
})
/*gh-pages*/
gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts)/*, fontsStyle*/);
let watch = gulp.parallel(build, watchFiles, browserSync);

//exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
