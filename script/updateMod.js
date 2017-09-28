var request = require('request'),
    fs = require('fs');

var ERIS_URL = 'https://raw.githubusercontent.com/liriliri/eris/master/doc.md',
    DEMO_URL = 'https://raw.githubusercontent.com/liriliri/eris/master/demo.json',
    demo = [];

request(DEMO_URL, function (err, res, body) 
{
    if (err) return console.log(err);

    demo = JSON.parse(body);

    requestDoc();
});    

function requestDoc() 
{
    request(ERIS_URL, function (err, res, body)
    {
        if (err) return console.log(err);

        body = addDesc(body);
        body = addSourceLink(body);

        var data = '---\nlayout: module.jade\ntitle: Module\n---\n\n' + body;

        fs.writeFile('src/module.md', data, 'utf-8', function (err) 
        {
            if (err) console.log(err);
        });
    });
}

function addDesc(body) 
{
    return body.replace(/^#.*/, function () 
    {
        return 'All source code is [hosted on GitHub](https://github.com/liriliri/eris).\n\nFeel free to report issues and make pull requests:)';
    });
}

function addSourceLink(body) 
{
    return body.replace(/^##\s+([\w$]+)/mg, function (match, name) 
    {
        var source = 'https://github.com/liriliri/eris/blob/master/' + name[0].toLowerCase() + '/' + name;

        var ret = match + '\n\n[source](' + source + '.js) ' + '[test](' + source + '.test.js)'; 

        if (demo.indexOf(name) > -1) 
        {
            ret += ' [demo](/demo/' + name + '.html)';
        }

        return ret;
    });
}