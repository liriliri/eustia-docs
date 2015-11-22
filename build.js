var path = require('path');

function dirPath()
{
    var args = [].slice.call(arguments);
    args.unshift(__dirname);
    return path.join.apply(null, args);
}

var layouts = require('metalsmith-layouts'),
    stylus  = require('metalsmith-stylus');

const metalsmith = require('metalsmith')(__dirname);

metalsmith.metadata({
    site: require(dirPath('data/site.json'))
}).source(
    dirPath('data')
).use(stylus({
    compress: true,
    paths: [dirPath('layout/css')]
})).use(layouts({
    engine : 'jade',
    pattern: '**/*.jade'
})).destination(
    dirPath('build')
).build(function (err) {
    if (err) throw err;
});
