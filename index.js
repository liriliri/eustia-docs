var path   = require('path'),
    marked = require('marked');

function dirPath()
{
    var args = [].slice.call(arguments);
    args.unshift(__dirname);
    return path.join.apply(null, args);
}

var layouts     = require('metalsmith-layouts'),
    stylus      = require('metalsmith-stylus'),
    markdown    = require('metalsmith-markdown'),
    collections = require('metalsmith-collections');

const metalsmith = require('metalsmith')(__dirname);

metalsmith.metadata({
    site: require(dirPath('data/site.json'))
}).source(
    dirPath('data')
).use(collections({

})).use(markdown({
    renderer: new marked.Renderer()
})).use(stylus({
    compress: true,
    paths: [dirPath('layout/css')]
})).use(layouts({
    engine   : 'jade',
    directory: 'layout',
    pattern  : '**/*.html',
    partials : 'layout/partial'
})).destination(
    dirPath('build')
).build(function (err)
{
    if (err) throw err;
});
