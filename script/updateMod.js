var request = require('request'),
    fs = require('fs');

var ERIS_URL = 'https://raw.githubusercontent.com/liriliri/eris/master/doc.md';

request(ERIS_URL, function (err, res, body)
{
    if (err) return console.log(err);

    body = addSourceLink(body);

    var data = '---\nlayout: module.jade\ntitle: Module\n---\n\n' + body;

    fs.writeFile('src/module.md', data, 'utf-8', function (err) 
    {
        if (err) console.log(err);
    });
});

function addSourceLink(body) 
{
    return body.replace(/^##\s+([\w$]+)/mg, function (match, name) 
    {
        var source = 'https://github.com/liriliri/eris/blob/master/' + name[0].toLowerCase() + '/' + name;

        return match + '\n\n[source](' + source + '.js) ' + '[test](' + source + '.test.js)'; 
    });
}