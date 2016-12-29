var path = require('path'),
    fs = require('fs'),
    ncp = require('ncp'),
    marked = require('marked'),
    autoprefixer = require('autoprefixer-stylus');

var layouts = require('metalsmith-layouts'),
    stylus = require('metalsmith-stylus'),
    markdown = require('metalsmith-markdown'),
    prism = require('metalsmith-prism'),
    ignore = require('metalsmith-ignore'),
    markedToc = require('./lib/markedToc');

var dirname = __dirname,
    env = 'release';

function dirPath()
{
    var args = [].slice.call(arguments);
    args.unshift(dirname);
    return path.join.apply(null, args);
}

function copyStatic()
{
    console.time('[metalsmith] build/static finished');

    fs.mkdir(dirPath('dist'), function ()
    {
       fs.mkdir(dirPath('dist/static'), function ()
       {
           ncp(dirPath('static'), dirPath('dist/static'), function (err)
           {
               if (err) return console.error(err);

               console.timeEnd('[metalsmith] build/static finished');
           });
       });
    });
}

var site = require('./src/site.json');

function build()
{
    site.baseUrl = (env === 'development') ? "http://localhost:8080/"
                                           : "http://liriliri.github.io/eustia/";

    var metalsmith = require('metalsmith')(dirname);

    var renderer = new marked.Renderer();

    renderer.heading = heading;

    console.time('[metalsmith] build/site finished');

    metalsmith.metadata({
        site: site
    }).source(
        'src'
    ).clean(
        false
    ).use(markedToc({
        omit: ['Eustia Documentation'],
        maxDepth: 1,
        slugify: slugify
    })).use(markdown({
        renderer: renderer,
        langPrefix: 'language-'
    })).use(stylus({
        compress: true,
        paths: [dirPath('layout/css')],
        use: [autoprefixer()]
    })).use(ignore([
        'site.json'
    ])).use(layouts({
        engine: 'jade',
        directory: 'layout',
        pattern: '**/*.html'
    })).use(
        prism()
    ).destination(
        'dist'
    ).build(function (err)
    {
        if (err) throw err;

        console.timeEnd('[metalsmith] build/site finished');
    });
}

function fullBuild()
{
    copyStatic();
    build();
}

function server()
{
    var st = require('st'),
        http = require('http');

    var mount = st({
        path: dirPath('dist'),
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

    var chokidar = require('chokidar');

    var options = {
        persistent: true,
        ignoreInitial: true,
        followSymlinks: true,
        usePolling: true,
        alwaysStat: false,
        depth: undefined,
        interval: 100,
        atomic: true,
        ignorePermissionErrors: false
    };

    var layout = chokidar.watch(dirPath('layout'), options),
        src = chokidar.watch(dirPath('src'), options),
        staticFiles = chokidar.watch(dirPath('static'), options);

    layout.on('change', build);
    src.on('change', build);
    staticFiles.on('change', copyStatic);
}

if (process.argv[2] === 'serve')
{
    env = 'development';
    server();
}

function heading(text, level)
{
    if (level !== 2) return '<h' + level + '>' + text + '</h' + level + '>';

    return '<h' + level + ' id="' + slugify(text) + '">' + text + '</h' + level + '>';
}

function slugify(str)
{
    return str.toLowerCase().replace(/\$/, 'dollar-').replace(/[^\w]+/g, '-')
}

fullBuild();
