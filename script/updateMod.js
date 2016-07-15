var request = require('request'),
    fs = require('fs');

var ERIS_URL = 'https://raw.githubusercontent.com/liriliri/eris/master/module.md';

request(ERIS_URL, function (err, res, body)
{
    var data = '---\nlayout: module.jade\ntitle: Guide\n---' + body;

    fs.writeFile('src/module.md', data, 'utf-8');
});