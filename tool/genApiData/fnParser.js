var _ = require('../../lib/util');

var Parser = require('./Parser');

var FnParser = Parser.extend({
    parse: function ()
    {
        var c;

        while (!this.eof())
        {
            c = this.c;

            if (this.state == 'name')
            {
                this.name();
                break;
            }

            if (this.state == 'desc')
            {
                this.desc();
                break;
            }

            this.consume();
        }

        return this.result;
    },
    desc: function ()
    {

    },
    name: function ()
    {
        var val = '';

        while (!(this.equal(':')))
        {
            val += this.c;
            this.forward();
            if (this.eof()) break;
        }

        this.result.name = val;

        this.state = 'desc';
    }
});


module.exports = function ()
{
    return function (files, metalsmith, done)
    {
        setImmediate(done);

        var file = files['function.json'];

        var data = JSON.parse(file.contents.toString());

        _.each(data, function (val, idx)
        {
            data[idx] = new FnParser(val).parse();
        });

        file.contents = new Buffer(JSON.stringify(data));
    };
};