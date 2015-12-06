var _ = require('../../lib/util');

module.exports = function ()
{
    return function (files, metalsmith, done)
    {
        setImmediate(done);
        _.each(['function', 'class', 'module'], function (val)
        {
            var file = files[val + '.json'];

            var data = {};
            data.layout = val + '.jade';

            data.data = JSON.parse(file.contents.toString());

            file.contents = new Buffer(JSON.stringify(data, null, 4));
        });
    };
};