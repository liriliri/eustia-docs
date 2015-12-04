var _ = require('../../lib/util');

const EOF = 'EndOfFile';

module.exports = _.Class({
    initialize: function (input)
    {
        this.input  = input;
        this.length = input.length;
        this.i      = 0;
        this.c      = (input.length === 0 ? EOF : input[0]);
        this.state  = 'name';
        this.result = {};
    },
    eof: function ()
    {
        return this.c === EOF;
    },
    parse: function ()
    {
        return this.result;
    },
    whiteSpace: function ()
    {
        var c = this.c;

        while (c === '' || c === '\t' || c === '\r' || c === '\n') this.forward();
    },
    consume: function (num)
    {
        num = num || 1;

        while (num--)
        {
            this.forward();
            this.whiteSpace();
        }
    },
    equal: function (str)
    {
        return this.c === str[0];
    },
    forward: function (num)
    {
        num = num || 1;

        while (num--)
        {
            this.i++;

            this.c = this.i >= this.length ? EOF : this.input[this.i];
        }
    }
});