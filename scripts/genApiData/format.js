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

            if (val === 'function')
            {
                data.data.sort(function (a, b)
                {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;

                    return 0;
                });
            }

            file.contents = new Buffer(JSON.stringify(data, null, 4));
        });
    };
};