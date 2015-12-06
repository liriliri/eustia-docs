var path = require('path');

var ignore      = require('metalsmith-ignore'),
    extractCmt  = require('./extractCmt'),
    fnParser    = require('./fnParser'),
    classParser = require('./classParser'),
    modParser   = require('./modParser'),
    format      = require('./format');

var metalsmith = require('metalsmith')(path.join(__dirname, '../../'));

metalsmith.source(
    'project/src'
).clean(
    false
).use(
    extractCmt()
).use(
    fnParser()
).use(
    classParser()
).use(
    modParser()
).use(
    format()
).use(ignore([
    '*.js'
])).destination(
    'src'
).build(function (err) { if (err) throw err });