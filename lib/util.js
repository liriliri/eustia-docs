// Built by eustia.
module.exports = (function ()
{
    var _ = {};

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

        function exports(str, suffix)
        {
            var idx = str.length - suffix.length;

            return idx >= 0 && str.indexOf(suffix, idx) === idx;
        }

        return exports;
    })();

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

        var ObjToStr = Object.prototype.toString;

        function exports(val)
        {
            return ObjToStr.call(val);
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

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function ()
    {
        /* Checks if value is classified as a Number primitive or object.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |value |*      |Value to check                       |
         * |return|boolean|True if value is correctly classified|
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

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function ()
    {
        /* Check if value is array-like.
         *
         * |Name  |Type   |Desc                       |
         * |------|-------|---------------------------|
         * |value |*      |Value to check             |
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

        /* dependencies
         * isNum has isFn 
         */

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        function exports(val)
        {
            if (!has(val, 'length')) return false;

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
                }
            }

            return function ()
            {
                return fn.apply(ctx, arguments);
            };
        }

        return exports;
    })();

    /* ------------------------------ each ------------------------------ */

    _.each = (function ()
    {
        /* Iterates over elements of collection and invokes iteratee for each element.
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

    return _;
})();