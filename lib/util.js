// Built by eustia.
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

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ endWith ------------------------------ */

    var endWith = _.endWith = (function (exports)
    {
        /* Check if string ends with the given target string.
         *
         * |Name  |Type   |Desc                           |
         * |----------------------------------------------|
         * |str   |string |The string to search           |
         * |suffix|string |String suffix                  |
         * |return|boolean|True if string ends with target|
         *
         * ```javascript
         * endWith('ab', 'b'); // -> true
         * ```
         */

        exports = function (str, suffix)
        {
            var idx = str.length - suffix.length;

            return idx >= 0 && str.indexOf(suffix, idx) === idx;
        };

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var has = _.has = (function (exports)
    {
        /* Checks if key is a direct property.
         *
         * |Name  |Type   |Desc                            |
         * |-----------------------------------------------|
         * |obj   |object |The object to query             |
         * |key   |string |The path to check               |
         * |return|boolean|True if key is a direct property|
         *
         * ```javascript
         * has({one: 1}, 'one'); // -> true
         * ```
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        exports = function (obj, key)
        {
            return hasOwnProp.call(obj, key);
        };

        return exports;
    })({});

    /* ------------------------------ keys ------------------------------ */

    var keys = _.keys = (function (exports)
    {
        /* Create an array of the own enumerable property names of object.
         *
         * |Name  |Type  |Desc                       |
         * |-----------------------------------------|
         * |obj   |object|The object to query        |
         * |return|array |The array of property names|
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

    /* ------------------------------ isJson ------------------------------ */

    var isJson = _.isJson = (function (exports)
    {
        function exports(fileName)
        {
            return endWith(fileName, '.json');
        }

        return exports;
    })({});

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function (exports)
    {
        /* Alias of Object.prototype.toString.
         *
         * |Name  |Type  |Desc                                    |
         * |------------------------------------------------------|
         * |value |*     |Source value                            |
         * |return|string|String representation of the given value|
         */

        var ObjToStr = Object.prototype.toString;

        exports = function (val)
        {
            return ObjToStr.call(val);
        };

        return exports;
    })({});

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function (exports)
    {
        /* Checks if value is classified as a Number primitive or object.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|True if value is correctly classified, else false|
         */

        exports = function (val)
        {
            return objToStr(val) === '[object Number]';
        };

        return exports;
    })({});

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function (exports)
    {
        // TODO

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return exports;
    })({});

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function (exports)
    {
        /* Iterates over elements of collection and invokes iteratee for each element.
         *
         * |Name    |Type         |Desc                          |
         * |-----------------------------------------------------|
         * |obj     |object\|array|Collection to iterate over    |
         * |iteratee|function     |Function invoked per iteration|
         * |[ctx]   |*            |Function context              |
         *
         * ```javascript
         * each({'a': 1, 'b': 2}, function (val, key) {});
         * ```
         */

        exports = function (obj, iteratee, ctx)
        {
            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee.call(ctx, obj[i], i, obj);
            } else
            {
                var _keys = keys(obj);
                for (i = 0, len = _keys.length; i < len; i++)
                {
                    iteratee.call(ctx, obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    })({});

    return _;
}));