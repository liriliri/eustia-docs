// Built by eustia.
"use strict";

var _ = {};

/* ------------------------------ has ------------------------------ */

var has = _.has = (function ()
{
    /* Checks if key is a direct property.
     *
     * |Name  |Type   |Desc                            |
     * |------|-------|--------------------------------|
     * |obj   |object |Object to query                 |
     * |key   |string |Path to check                   |
     * |return|boolean|True if key is a direct property|
     *
     * ```javascript
     * has({one: 1}, 'one'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var hasOwnProp = Object.prototype.hasOwnProperty;

    function exports(obj, key)
    {
        return hasOwnProp.call(obj, key);
    }

    return exports;
})();

/* ------------------------------ keys ------------------------------ */

var keys = _.keys = (function (exports)
{
    /* Create an array of the own enumerable property names of object.
     *
     * |Name  |Type  |Desc                   |
     * |------|------|-----------------------|
     * |obj   |object|Object to query        |
     * |return|array |Array of property names|
     * 
     * ```javascript
     * keys({a: 1}); // -> ['a']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has 
     */

    exports = Object.keys || function (obj)
    {
        var ret = [], key;

        for (key in obj)
        {
            if (has(obj, key)) ret.push(key);
        }

        return ret;
    };

    return exports;
})({});

/* ------------------------------ endWith ------------------------------ */

_.endWith = (function ()
{
    /* Check if string ends with the given target string.
     *
     * |Name  |Type   |Desc                           |
     * |------|-------|-------------------------------|
     * |str   |string |The string to search           |
     * |suffix|string |String suffix                  |
     * |return|boolean|True if string ends with target|
     *
     * ```javascript
     * endWith('ab', 'b'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str, suffix)
    {
        var idx = str.length - suffix.length;

        return idx >= 0 && str.indexOf(suffix, idx) === idx;
    }

    return exports;
})();

/* ------------------------------ objToStr ------------------------------ */

var objToStr = _.objToStr = (function ()
{
    /* Alias of Object.prototype.toString.
     *
     * |Name  |Type  |Desc                                |
     * |------|------|------------------------------------|
     * |value |*     |Source value                        |
     * |return|string|String representation of given value|
     * 
     * ```javascript
     * objToStr(5); // -> '[object Number]'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var ObjToStr = Object.prototype.toString;

    function exports(val)
    {
        return ObjToStr.call(val);
    }

    return exports;
})();

/* ------------------------------ isArr ------------------------------ */

var isArr = _.isArr = (function (exports)
{
    /* Check if value is an `Array` object.
     *
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |val   |*      |Value to check                    |
     * |return|boolean|True if value is an `Array` object|
     *
     * ```javascript
     * isArr([]); // -> true
     * isArr({}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    exports = Array.isArray || function (val)
    {
        return objToStr(val) === '[object Array]';
    };

    return exports;
})({});

/* ------------------------------ castPath ------------------------------ */

var castPath = _.castPath = (function ()
{
    /* Cast value into a property path array.
     *
     * |Name  |Type  |Desc               |
     * |------|------|-------------------|
     * |str   |*     |Value to inspect   |
     * |[obj] |object|Object to query    |
     * |return|array |Property path array|
     * 
     * ```javascript
     * castPath('a.b.c'); // -> ['a', 'b', 'c']
     * castPath(['a']); // -> ['a']
     * castPath('a[0].b'); // -> ['a', '0', 'b']
     * castPath('a.b.c', {'a.b.c': true}); // -> ['a.b.c']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has isArr 
     */

    function exports(str, obj) 
    {
        if (isArr(str)) return str;
        if (obj && has(obj, str)) return [str];

        var ret = [];

        str.replace(regPropName, function(match, number, quote, str) 
        {
            ret.push(quote ? str.replace(regEscapeChar, '$1') : (number || match));
        });

        return ret;
    }

    // Lodash _stringToPath
    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        regEscapeChar = /\\(\\)?/g;

    return exports;
})();

/* ------------------------------ isNum ------------------------------ */

var isNum = _.isNum = (function ()
{
    /* Check if value is classified as a Number primitive or object.
     *
     * |Name  |Type   |Desc                                 |
     * |------|-------|-------------------------------------|
     * |val   |*      |Value to check                       |
     * |return|boolean|True if value is correctly classified|
     * 
     * ```javascript
     * isNum(5); // -> true
     * isNum(5.1); // -> true
     * isNum({}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val)
    {
        return objToStr(val) === '[object Number]';
    }

    return exports;
})();

/* ------------------------------ isFn ------------------------------ */

var isFn = _.isFn = (function ()
{
    /* Check if value is a function.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is a function|
     *
     * Generator function is also classified as true.
     *
     * ```javascript
     * isFn(function() {}); // -> true
     * isFn(function*() {}); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val)
    {
        var objStr = objToStr(val);

        return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
    }

    return exports;
})();

/* ------------------------------ isArrLike ------------------------------ */

var isArrLike = _.isArrLike = (function ()
{
    /* Check if value is array-like.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is array like|
     *
     * > Function returns false.
     *
     * ```javascript
     * isArrLike('test'); // -> true
     * isArrLike(document.body.children); // -> true;
     * isArrLike([1, 2, 3]); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNum isFn 
     */

    var MAX_ARR_IDX = Math.pow(2, 53) - 1;

    function exports(val)
    {
        if (!val) return false;

        var len = val.length;

        return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
    }

    return exports;
})();

/* ------------------------------ isUndef ------------------------------ */

var isUndef = _.isUndef = (function ()
{
    /* Check if value is undefined.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is undefined|
     *
     * ```javascript
     * isUndef(void 0); // -> true
     * isUndef(null); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val)
    {
        return val === void 0;
    }

    return exports;
})();

/* ------------------------------ optimizeCb ------------------------------ */

var optimizeCb = _.optimizeCb = (function ()
{
    /* Used for function context binding.
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef 
     */

    function exports(fn, ctx, argCount)
    {
        if (isUndef(ctx)) return fn;

        switch (argCount == null ? 3 : argCount)
        {
            case 1: return function (val)
            {
                return fn.call(ctx, val);
            };
            case 3: return function (val, idx, collection)
            {
                return fn.call(ctx, val, idx, collection);
            };
            case 4: return function (accumulator, val, idx, collection)
            {
                return fn.call(ctx, accumulator, val, idx, collection);
            };
        }

        return function ()
        {
            return fn.apply(ctx, arguments);
        };
    }

    return exports;
})();

/* ------------------------------ each ------------------------------ */

var each = _.each = (function ()
{
    /* Iterate over elements of collection and invokes iteratee for each element.
     *
     * |Name    |Type        |Desc                          |
     * |--------|------------|------------------------------|
     * |obj     |object array|Collection to iterate over    |
     * |iteratee|function    |Function invoked per iteration|
     * |[ctx]   |*           |Function context              |
     *
     * ```javascript
     * each({'a': 1, 'b': 2}, function (val, key) {});
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike keys optimizeCb 
     */

    function exports(obj, iteratee, ctx)
    {
        iteratee = optimizeCb(iteratee, ctx);

        var i, len;

        if (isArrLike(obj))
        {
            for (i = 0, len = obj.length; i < len; i++) iteratee(obj[i], i, obj);
        } else
        {
            var _keys = keys(obj);
            for (i = 0, len = _keys.length; i < len; i++)
            {
                iteratee(obj[_keys[i]], _keys[i], obj);
            }
        }

        return obj;
    }

    return exports;
})();

/* ------------------------------ nextTick ------------------------------ */

var nextTick = _.nextTick = (function (exports)
{
    /* Next tick for both node and browser.
     *
     * |Name|Type    |Desc            |
     * |----|--------|----------------|
     * |cb  |function|Function to call|
     *
     * Use process.nextTick if available.
     *
     * Otherwise setImmediate or setTimeout is used as fallback.
     *
     * ```javascript
     * nextTick(function ()
     * {
     *     // Do something...
     * });
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    if (typeof process === 'object' && process.nextTick)
    {
        exports = process.nextTick;
    } else if (typeof setImmediate === 'function')
    {
        exports = function (cb) { setImmediate(ensureCallable(cb)); };
    } else
    {
        exports = function (cb) { setTimeout(ensureCallable(cb), 0); };
    }

    function ensureCallable(fn)
    {
        if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

        return fn;
    }

    return exports;
})({});

/* ------------------------------ noop ------------------------------ */

var noop = _.noop = (function ()
{
    /* A no-operation function.
     *
     * ```javascript
     * noop(); // Does nothing
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports() {}

    return exports;
})();

/* ------------------------------ parallel ------------------------------ */

var parallel = _.parallel = (function ()
{
    /* Run an array of functions in parallel.
     *
     * |Name |Type    |Desc                   |
     * |-----|--------|-----------------------|
     * |tasks|array   |Array of functions     |
     * |[cb] |function|Callback once completed|
     *
     * ```javascript
     * parallel([
     *     function(cb)
     *     {
     *         setTimeout(function () { cb(null, 'one') }, 200);
     *     },
     *     function(cb)
     *     {
     *         setTimeout(function () { cb(null, 'two') }, 100);
     *     }
     * ], function (err, results)
     * {
     *     // results -> ['one', 'two']
     * });
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * noop each nextTick 
     */

    function exports(tasks, cb)
    {
        cb = cb || noop;

        var results = [],
            pending = tasks.length;

        if (!pending) return done(null);

        each(tasks, function (task, i)
        {
            task(function (err, result) { taskCb(i, err, result); });
        });

        function taskCb(i, err, result)
        {
            results[i] = result;
            if (--pending === 0 || err) done(err);
        }

        function done(err)
        {
            nextTick(function ()
            {
                cb(err, results);
                cb = noop;
            });
        }
    }

    return exports;
})();

/* ------------------------------ rmdir ------------------------------ */

_.rmdir = (function ()
{
    /* Recursively remove directories.
     *
     * |Name    |Type    |Desc               |
     * |--------|--------|-------------------|
     * |dir     |string  |Directory to remove|
     * |callback|function|Callback           |
     * 
     * ```javascript
     * rmdir('/tmp/foo/bar/baz', function (err) 
     * {
     *     if (err) console.log (err);
     *     else console.log('Done');
     * });
     * ```
     */

    /* module
     * env: node
     * test: node
     */

    /* dependencies
     * noop parallel 
     */ 

    var fs = require('fs'),
        path = require('path');

    function exports(p, cb) 
    {
        cb = cb || noop;
        p = path.resolve(p);

        fs.lstat(p, function (err, stat) 
        {
            if (err) return cb(err);

            var isDir = stat.isDirectory();

            if (!isDir) 
            {
                return fs.unlink(p, function (err) 
                {
                    return err ? cb(err) : cb();
                });
            }

            fs.readdir(p, function (err, files) 
            {
                if (err) return cb(err);

                var len = files.length;

                var cbs = [];
                for (var i = 0; i < len; i++) 
                {
                    cbs.push((function (file) 
                    {
                        return function (cb) 
                        {
                            exports(file, cb);
                        };
                    })(path.resolve(p, files[i])));
                }

                parallel(cbs, function(err) 
                {
                    if (err) return cb(err);

                    fs.rmdir(p, function (err) 
                    {
                        return err ? cb(err) : cb();
                    });
                });
            });
        });
    }

    return exports;
})();

/* ------------------------------ safeGet ------------------------------ */

_.safeGet = (function ()
{
    /* Get object property, don't throw undefined error.
     *
     * |Name  |Type        |Desc                     |
     * |------|------------|-------------------------|
     * |obj   |object      |Object to query          |
     * |path  |array string|Path of property to get  |
     * |return|*           |Target value or undefined|
     *
     * ```javascript
     * var obj = {a: {aa: {aaa: 1}}};
     * safeGet(obj, 'a.aa.aaa'); // -> 1
     * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
     * safeGet(obj, 'a.b'); // -> undefined
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef castPath 
     */

    function exports(obj, path)
    {
        path = castPath(path, obj);

        var prop;

        /* eslint-disable no-cond-assign */
        while (prop = path.shift())
        {
            obj = obj[prop];
            if (isUndef(obj)) return;
        }

        return obj;
    }

    return exports;
})();

module.exports = _;