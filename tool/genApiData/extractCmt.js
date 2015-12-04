 var _ = require('../../lib/util');

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

            var comments = _.extractBlockCmt(data.contents.toString());

            if (!comments) return;

            comments = _.map(comments, function (comment)
            {
                comment = comment.replace(/^\/\*+|\*+\/$/mg, '')
                                 .replace(/\n\s*\*+\s*/mg, '\n')
                                 .replace(/\r/mg, '');

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