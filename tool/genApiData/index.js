var path = require('path');

var ignore      = require('metalsmith-ignore'),
    extractCmt  = require('./extractCmt'),
    fnParser    = require('./fnParser'),
    classParser = require('./classParser'),
    modParser   = require('./modParser');

var metalsmith = require('metalsmith')(path.join(__dirname, '../../'));

metalsmith.source(
    'eustia/src'
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
).use(ignore([
    '*.js'
])).destination(
    'build'
).build(function (err) { if (err) throw err });