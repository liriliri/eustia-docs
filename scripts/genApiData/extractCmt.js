 var _ = require('../../lib/util'),
     extractCmts = require('extract-comments');

module.exports = function ()
{
    return function (files, metalsmith, done)
    {
        setImmediate(done);

        var fnData    = [],
            classData = [],
            modData   = [];

        _.each(files, function (data, key)
        {
            if (!_.isJs(key)) return;

            var comments = extractCmts(data.contents.toString());

            if (comments.length === 0) return;

            comments = _.map(comments, function (comment)
            {
                comment = comment.value;

                return _.trim(comment);
            });

            _.each(comments, function (comment)
            {
                if (_.startWith(comment, 'function'))
                {
                    return fnData.push(_.ltrim(comment.slice(8)));
                }

                if (_.startWith(comment, 'class'))
                {
                    return classData.push(_.ltrim(comment.slice(5)));
                }

                if (_.startWith(comment, 'module'))
                {
                    return modData.push(_.ltrim(comment.slice(6)));
                }
            });
        });

        files['class.json']    = { contents: new Buffer(JSON.stringify(classData)) };
        files['function.json'] = { contents: new Buffer(JSON.stringify(fnData)) };
        files['module.json']   = { contents: new Buffer(JSON.stringify(modData)) };
    };
};