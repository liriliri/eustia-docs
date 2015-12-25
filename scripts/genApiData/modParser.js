module.exports = function ()
{
    return function (files, metalsmith, done)
    {
        setImmediate(done);
    };
};