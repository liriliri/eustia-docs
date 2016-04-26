var request = require('request'),
    fs = require('fs');

var ERIS_URL = 'https://raw.githubusercontent.com/liriliri/eris/master/eris.json';

request(ERIS_URL, function (err, res, body)
{
    var eris = JSON.parse(body);

    var data = {
        layout: 'eris.jade'
    };

    data.data = eris;

    fs.writeFile('src/eris.json', JSON.stringify(data, null, 4), 'utf-8');
});