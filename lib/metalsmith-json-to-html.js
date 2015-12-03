var path = require('path'),
    _    = require('./util');

var regJson = /\.json/;

function isJson(fileName)
{
    return regJson.test(path.extname(fileName));
}

module.exports = function ()
{
    return function (files, metalsmith, done)
    {
        setImmediate(done);

        _.each(files, function (data, key)
        {
            if (!isJson(key)) return;

            var fileName = path.basename(key, path.extname(key)) + '.html';

            data = JSON.parse(data.contents.toString());
            data.contents = new Buffer(data.contents || '');

            delete files[key];

            files[fileName] = data;
        });
    };
};