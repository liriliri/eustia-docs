var path   = require('path'),
    fs     = require('fs'),
    ncp    = require('ncp'),
    marked = require('marked'),
    autoprefixer = require('autoprefixer-stylus');

var dirname = __dirname;

function dirPath()
{
    var args = [].slice.call(arguments);
    args.unshift(dirname);
    return path.join.apply(null, args);
}

var layouts     = require('metalsmith-layouts'),
    stylus      = require('metalsmith-stylus'),
    markdown    = require('metalsmith-markdown'),
    prism       = require('metalsmith-prism'),
    ignore      = require('metalsmith-ignore'),
    jsonToHtml  = require('./lib/metalsmith-json-to-html'),
    collections = require('metalsmith-collections');

function copyStatic()
{
    console.time('[metalsmith] build/static finished');

    fs.mkdir(dirPath('build'), function ()
    {
       fs.mkdir(dirPath('build/static'), function ()
       {
           ncp(dirPath('static'), dirPath('build/static'), function (err)
           {
               if (err) return console.error(err);

               console.timeEnd('[metalsmith] build/static finished');
           });
       });
    });
}

function build()
{
    const metalsmith = require('metalsmith')(dirname);

    console.time('[metalsmith] build/site finished');

    metalsmith.metadata({
        site: require(dirPath('src/site.json'))
    }).source(
        dirPath('src')
    ).use(collections({
        guide: {
            pattern: 'guide/!(index).md'
        }
    })).use(markdown({
        renderer: new marked.Renderer(),
        langPrefix: 'language-'
    })).use(
        prism()
    ).use(stylus({
        compress: true,
        paths   : [dirPath('layout/css')],
        use     : [autoprefixer()]
    })).use(ignore([
        'site.json'
    ])).use(
        jsonToHtml()
    ).use(layouts({
        engine   : 'jade',
        directory: 'layout',
        pattern  : '**/*.html'
    })).use(layouts({
        engine   : 'jade',
        directory: 'layout',
        pattern  : '**/*.json'
    })).destination(
        dirPath('build')
    ).build(function (err)
    {
        if (err) throw err;

        console.timeEnd('[metalsmith] build/site finished');

        copyStatic();
    });
}

function server()
{
    var st   = require('st'),
        http = require('http');

    const mount = st({
        path : dirPath('build'),
        cache: false,
        index: 'index.html'
    });

    http.createServer(function (req, res)
    {
        mount(req, res);
    }).listen(8080, function ()
    {
        console.log('http://localhost:8080/');
    });

    const chokidar = require('chokidar');

    var options = {
        persistent    : true,
        ignoreInitial : true,
        followSymlinks: true,
        usePolling    : true,
        alwaysStat    : false,
        depth         : undefined,
        interval      : 100,
        atomic        : true,
        ignorePermissionErrors: false
    };

    var layout  = chokidar.watch(dirPath('layout'), options),
        src     = chokidar.watch(dirPath('src'), options),
        staticFiles = chokidar.watch(dirPath('static'), options);

    layout.on('change', build);
    src.on('change', build);
    staticFiles.on('change', build);
}

build();

if (process.argv[2] === 'serve') server();
