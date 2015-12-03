(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root._ = factory() }
}(this, function ()
{
    var _ = {};

    function _define(name, requires, method)
    {
        _[name] = {
            requires: requires,
            body    : method
        };

        delete requireMarks[name];
    }

    function _init(methods)
    {
        for (var i = 0, len = methods.length; i < len; i++) _require(methods[i]);
    }

    var requireMarks = {};

    function _require(name)
    {
        if (requireMarks.hasOwnProperty(name)) return _[name];

        var requires = _[name].requires,
            body     = _[name].body,
            len      = requires.length;

        for (var i = 0; i < len; i++) requires[i] = _require(requires[i]);

        requires.push(_);

        var exports = body.apply(_, requires);
        if (exports) _[name] = exports;

        requireMarks[name] = true;

        return _[name];
    }

    _define('each', ['isArrLike', 'keys', 'optimizeCb'], function (isArrLike, keys, optimizeCb)
    {
        var each;

        each = function (obj, iteratee, ctx)
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
        };

        _.each = each;
    });

    _define('keys', ['isObj', 'has'], function (isObj, has)
    {
        var keys;

        var nativeKeys = Object.keys;

        keys = nativeKeys || function (obj)
        {
            var keys = [];

            for (var key in obj) { if (has(obj, key)) keys.push(key) }

            return keys;
        };

        _.keys = keys;
    });

    _define('optimizeCb', ['isUndef'], function (isUndef)
    {
        var optimizeCb;

        optimizeCb = function (func, ctx, argCount)
        {
            if (isUndef(ctx)) return func;

            switch (argCount == null ? 3 : argCount)
            {
                case 1: return function (val)
                {
                    return func.call(ctx, val);
                };
                case 3: return function (val, idx, collection)
                {
                    return func.call(ctx, val, idx, collection);
                };
                case 4: return function (accumulator, val, idx, collection)
                {
                    return func.call(ctx, accumulator, val, idx, collection);
                }
            }

            return function ()
            {
                return func.apply(ctx, arguments);
            };
        };

        _.optimizeCb = optimizeCb;
    });

    _define('isNum', ['_toStr'], function (_toStr)
    {
        var isNum;

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        _.isNum = isNum;
    });

    _define('isUndef', [], function ()
    {
        var isUndef;

        isUndef = function (value) { return value === void 0 };

        _.isUndef = isUndef;
    });

    _define('has', [], function ()
    {
        var has;

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key) { return hasOwnProp.call(obj, key) };

        _.has = has;
    });

    _define('isObj', [], function ()
    {
        var isObj;

        isObj = function (val)
        {
            var type = typeof val;

            return type === 'function' || type === 'object';
        };

        _.isObj = isObj;
    });

    _define('isArrLike', ['isNum', 'has'], function (isNum, has)
    {
        var isArrLike;

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        isArrLike = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        _.isArrLike = isArrLike;
    });

    _define('_toStr', [], function ()
    {
        var _toStr;

        _toStr = Object.prototype.toString;

        _._toStr = _toStr;
    });

    _init([
        'each',
        'keys',
        'optimizeCb',
        'isNum',
        'isUndef',
        'has',
        'isObj',
        'isArrLike',
        '_toStr'
    ]);

    return _;
}));