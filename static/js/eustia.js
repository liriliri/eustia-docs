// Built by eustia.
window._ = (function()
{
    var _ = {};

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ last ------------------------------ */

    var last = _.last = (function ()
    {
        /* Get the last element of array.
         *
         * |Name  |Type |Desc                     |
         * |------|-----|-------------------------|
         * |arr   |array|The array to query       |
         * |return|*    |The last element of array|
         *
         * ```javascript
         * last([1, 2]); // -> 2
         * ```
         */

        function exports(arr)
        {
            var len = arr ? arr.length : 0;

            if (len) return arr[len - 1];
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

    /* ------------------------------ isObj ------------------------------ */

    var isObj = _.isObj = (function ()
    {
        /* Check if value is the language type of Object.
         *
         * |Name  |Type   |Desc                      |
         * |------|-------|--------------------------|
         * |val   |*      |Value to check            |
         * |return|boolean|True if value is an object|
         *
         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
         *
         * ```javascript
         * isObj({}); // -> true
         * isObj([]); // -> true
         * ```
         */

        function exports(val)
        {
            var type = typeof val;

            return !!val && (type === 'function' || type === 'object');
        }

        return exports;
    })();

    /* ------------------------------ startWith ------------------------------ */

    var startWith = _.startWith = (function ()
    {
        /* Check if string starts with the given target string.
         *
         * |Name  |Type   |Desc                             |
         * |------|-------|---------------------------------|
         * |str   |string |String to search                 |
         * |prefix|string |String prefix                    |
         * |return|boolean|True if string starts with prefix|
         *
         * ```javascript
         * startWith('ab', 'a'); // -> true
         * ```
         */

        function exports(str, prefix)
        {
            return str.indexOf(prefix) === 0;
        }

        return exports;
    })();

    /* ------------------------------ inherits ------------------------------ */

    var inherits = _.inherits = (function ()
    {
        /* Inherit the prototype methods from one constructor into another.
         *
         * |Name      |Type    |Desc       |
         * |----------|--------|-----------|
         * |Class     |function|Child Class|
         * |SuperClass|function|Super Class|
         *
         * ```javascript
         * function People(name)
         * {
         *     this._name = name;
         * }
         * People.prototype = {
         *     getName: function ()
         *     {
         *         return this._name;
         *     }
         * };
         * function Student(name)
         * {
         *     this._name = name;
         * }
         * inherits(Student, People);
         * var s = new Student('RedHood');
         * s.getName(); // -> 'RedHood'
         * ```
         */

        function exports(Class, SuperClass)
        {
            if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

            noop.prototype = SuperClass.prototype;
            Class.prototype = new noop();
        }

        var objCreate = Object.create;

        function noop() {}

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

    /* ------------------------------ slice ------------------------------ */

    var slice = _.slice = (function ()
    {
        /* Create slice of source array or array-like object.
         *
         * |Name              |Type  |Desc                      |
         * |------------------|------|--------------------------|
         * |array             |array |Array to slice            |
         * |[start=0]         |number|Start position            |
         * |[end=array.length]|number|End position, not included|
         *
         * ```javascript
         * slice([1, 2, 3, 4], 1, 2); // -> [2]
         * ```
         */

        function exports(arr, start, end)
        {
            var len = arr.length;

            if (start == null)
            {
                start = 0;
            } else if (start < 0)
            {
                start = Math.max(len + start, 0);
            } else
            {
                start = Math.min(start, len);
            }

            if (end == null)
            {
                end = len;
            } else if (end < 0)
            {
                end = Math.max(len + end, 0);
            } else
            {
                end = Math.min(end, len);
            }

            var ret = [];
            while (start < end) ret.push(arr[start++]);

            return ret;
        }

        return exports;
    })();

    /* ------------------------------ now ------------------------------ */

    var now = _.now = (function (exports)
    {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch.
         *
         * ```javascript
         * now(); // -> 1468826678701
         * ```
         */

        exports = Date.now || function ()
        {
            return new Date().getTime();
        };

        return exports;
    })({});

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function ()
    {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name  |Type  |Desc                       |
         * |------|------|---------------------------|
         * |obj   |object|Object to query            |
         * |return|array |Array of all property names|
         *
         * > Members of Object's prototype won't be retrieved.
         *
         * ```javascript
         * var obj = Object.create({zero: 0});
         * obj.one = 1;
         * allKeys(obj) // -> ['zero', 'one']
         * ```
         */

        function exports(obj)
        {
            var ret = [], key;

            for (key in obj) ret.push(key);

            return ret;
        }

        return exports;
    })();

    /* ------------------------------ before ------------------------------ */

    var before = _.before = (function ()
    {
        /* Create a function that invokes less than n times.
         *
         * |Name  |Type    |Desc                                            |
         * |------|--------|------------------------------------------------|
         * |n     |number  |Number of calls at which fn is no longer invoked|
         * |fn    |function|Function to restrict                            |
         * |return|function|New restricted function                         |
         *
         * Subsequent calls to the created function return the result of the last fn invocation.
         *
         * ```javascript
         * $(element).on('click', before(5, function() {}));
         * // -> allow function to be call 4 times at last.
         * ```
         */

        function exports(n, fn)
        {
            var memo;

            return function ()
            {
                if (--n > 0) memo = fn.apply(this, arguments);
                if (n <= 1) fn = null;

                return memo;
            };
        }

        return exports;
    })();

    /* ------------------------------ splitCase ------------------------------ */

    var splitCase = _.splitCase = (function ()
    {
        /* Split different string case to an array.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |str   |string|String to split|
         * |return|array |Result array   |
         *
         * ```javascript
         * splitCase('foo-bar'); // -> ['foo', 'bar']
         * splitCase('foo bar'); // -> ['foo', 'bar']
         * splitCase('foo_bar'); // -> ['foo', 'bar']
         * splitCase('foo.bar'); // -> ['foo', 'bar']
         * splitCase('fooBar'); // -> ['foo', 'bar']
         * splitCase('foo-Bar'); // -> ['foo', 'bar']
         * ```
         */

        var regUpperCase = /([A-Z])/g,
            regSeparator = /[_.\- ]+/g,
            regTrim = /(^-)|(-$)/g;

        function exports(str)
        {
            str = str.replace(regUpperCase, '-$1')
                     .toLowerCase()
                     .replace(regSeparator, '-')
                     .replace(regTrim, '');

            return str.split('-');
        }

        return exports;
    })();

    /* ------------------------------ camelCase ------------------------------ */

    var camelCase = _.camelCase = (function ()
    {
        /* Convert string to "camelCase".
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Camel cased string|
         *
         * ```javascript
         * camelCase('foo-bar'); // -> fooBar
         * camelCase('foo bar'); // -> fooBar
         * camelCase('foo_bar'); // -> fooBar
         * camelCase('foo.bar'); // -> fooBar
         * ```
         */

        /* dependencies
         * splitCase 
         */

        function exports(str)
        {
            var arr = splitCase(str);

            var ret = arr[0];
            arr.shift();

            arr.forEach(capitalize, arr);
            ret += arr.join('');

            return ret;
        }

        function capitalize(val, idx)
        {
            this[idx] = val.replace(/\w/, function (match)
            {
                return match.toUpperCase();
            });
        }

        return exports;
    })();

    /* ------------------------------ kebabCase ------------------------------ */

    var kebabCase = _.kebabCase = (function ()
    {
        /* Convert string to "kebabCase".
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Kebab cased string|
         *
         * ```javascript
         * kebabCase('fooBar'); // -> foo-bar
         * kebabCase('foo bar'); // -> foo-bar
         * kebabCase('foo_bar'); // -> foo-bar
         * kebabCase('foo.bar'); // -> foo-bar
         * ```
         */

        /* dependencies
         * splitCase 
         */

        function exports(str)
        {
            return splitCase(str).join('-');
        }

        return exports;
    })();

    /* ------------------------------ idxOf ------------------------------ */

    var idxOf = _.idxOf = (function ()
    {
        /* Get the index at which the first occurrence of value.
         *
         * |Name       |Type  |Desc                |
         * |-----------|------|--------------------|
         * |arr        |array |Array to search     |
         * |val        |*     |Value to search for |
         * |[fromIdx=0]|number|Index to search from|
         *
         * ```javascript
         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
         * ```
         */

        function exports(arr, val, fromIdx)
        {
            return Array.prototype.indexOf.call(arr, val, fromIdx);
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

    /* ------------------------------ upperFirst ------------------------------ */

    var upperFirst = _.upperFirst = (function ()
    {
        /* Convert the first character of string to upper case.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to convert|
         * |return|string|Converted string |
         *
         * ```javascript
         * upperFirst('red'); // -> Red
         * ```
         */

        function exports(str)
        {
            if (str.length < 1) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        return exports;
    })();

    /* ------------------------------ identity ------------------------------ */

    var identity = _.identity = (function ()
    {
        /* Return the first argument given.
         *
         * |Name  |Type|Desc       |
         * |------|----|-----------|
         * |val   |*   |Any value  |
         * |return|*   |Given value|
         *
         * ```javascript
         * identity('a'); // -> 'a'
         * ```
         */

        function exports(val)
        {
            return val;
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
         * |val   |*      |The value to check                |
         * |return|boolean|True if value is an `Array` object|
         *
         * ```javascript
         * isArr([]); // -> true
         * isArr({}); // -> false
         * ```
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

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function ()
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

    /* ------------------------------ createAssigner ------------------------------ */

    var createAssigner = _.createAssigner = (function ()
    {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Type    |Desc                          |
         * |--------|--------|------------------------------|
         * |keysFn  |function|Function to get object keys   |
         * |defaults|boolean |No override when set to true  |
         * |return  |function|Result function, extend...    |
         */

        /* dependencies
         * isUndef each 
         */

        function exports(keysFn, defaults)
        {
            return function (obj)
            {
                each(arguments, function (src, idx)
                {
                    if (idx === 0) return;

                    var keys = keysFn(src);

                    each(keys, function (key)
                    {
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    });
                });

                return obj;
            };
        }

        return exports;
    })();

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports)
    {
        /* Copy all of the properties in the source objects over to the destination object.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |obj   |object|Destination object|
         * |...src|object|Sources objects   |
         * |return|object|Destination object|
         *
         * ```javascript
         * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         * ```
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports)
    {
        /* Like extend, but only copies own properties over to the destination object.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |obj   |object|Destination object|
         * |*src  |object|Sources objects   |
         * |return|object|Destination object|
         *
         * ```javascript
         * extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         * ```
         */

        /* dependencies
         * keys createAssigner 
         */

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ easing ------------------------------ */

    var easing = _.easing = (function (exports)
    {
        /* Easing functions adapted from http://jqueryui.com/
         *
         * |Name   |Type  |Desc                  |
         * |-------|------|----------------------|
         * |percent|number|Number between 0 and 1|
         * |return |number|Calculated number     |
         *
         * ```javascript
         * easing.linear(0.5); // -> 0.5
         * easing.inElastic(0.5, 500); // -> 0.03125
         * ```
         */

        /* dependencies
         * each upperFirst 
         */

        exports.linear = function (t) { return t };

        var pow = Math.pow,
            sqrt = Math.sqrt,
            sin = Math.sin,
            min = Math.min,
            asin = Math.asin,
            PI = Math.PI;

        var fns = {
            sine: function(t)
            {
                return 1 + sin(PI / 2 * t - PI / 2);
            },
            circ: function(t)
            {
                return 1 - sqrt(1 - t * t);
            },
            elastic: function(t, m)
            {
                m = m || DEFAULT_ELASTICITY;

                if(t === 0 || t === 1) return t;

                var p = (1 - min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / (2 * PI) * asin(1);

                return -(pow(2, 10 * st1) * sin((st1 - s) * (2 * PI) / p));
            },
            back: function(t)
            {
                return t * t * (3 * t - 2);
            },
            bounce: function(t)
            {
                var pow2, bounce = 4;

                /* eslint-disable no-empty */
                while (t < ((pow2 = pow(2, --bounce)) - 1) / 11) {}

                return 1 / pow(4, 3 - bounce) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
            }
        };

        each(['quad', 'cubic', 'quart', 'quint', 'expo'], function (name, i)
        {
            fns[name] = function (t)
            {
                return pow(t, i + 2);
            };
        });

        var DEFAULT_ELASTICITY = 400;

        each(fns, function (fn, name)
        {
            name = upperFirst(name);
            exports['in' + name] = fn;
            exports['out' + name] = function(t, m)
            {
                return 1 - fn(1 - t, m);
            };
            exports['inOut' + name] = function(t, m)
            {
                return t < 0.5 ? fn(t * 2, m) / 2 : 1 - fn(t * -2 + 2, m) / 2;
            };
            exports['outIn' + name] = function(t, m)
            {
                return t < 0.5 ? (1 - fn(1 - 2 * t, m)) / 2 : (fn(t * 2 - 1, m) + 1) / 2;
            };
        });

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function ()
    {
        /* Create an array of the own enumerable property values of object.
         *
         * |Name  |Type  |Desc                    |
         * |------|------|------------------------|
         * |obj   |object|Object to query         |
         * |return|array |Array of property values|
         *
         * ```javascript
         * values({one: 1, two: 2}); // -> [1, 2]
         * ```
         */

        /* dependencies
         * each 
         */

        function exports(obj)
        {
            var ret = [];

            each(obj, function (val) { ret.push(val) });

            return ret;
        }

        return exports;
    })();

    /* ------------------------------ contain ------------------------------ */

    var contain = _.contain = (function ()
    {
        /* Check if the value is present in the list.
         *
         * |Name  |Type        |Desc                                |
         * |------|------------|------------------------------------|
         * |array |array object|Target list                         |
         * |value |*           |Value to check                      |
         * |return|boolean     |True if value is present in the list|
         *
         * ```javascript
         * contain([1, 2, 3], 1); // -> true
         * contain({a: 1, b: 2}, 1); // -> true
         * ```
         */

        /* dependencies
         * idxOf isArrLike values 
         */

        function exports(arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return idxOf(arr, val) >= 0;
        }

        return exports;
    })();

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function ()
    {
        /* Check if value is a string primitive.
         *
         * |Name  |Type   |Desc                               |
         * |------|-------|-----------------------------------|
         * |val   |*      |Value to check                     |
         * |return|boolean|True if value is a string primitive|
         *
         * ```javascript
         * isStr('eris'); // -> true
         * ```
         */

        /* dependencies
         * objToStr 
         */

        function exports(val)
        {
            return objToStr(val) === '[object String]';
        }

        return exports;
    })();

    /* ------------------------------ safeGet ------------------------------ */

    var safeGet = _.safeGet = (function ()
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

        /* dependencies
         * isStr isUndef 
         */

        function exports(obj, path)
        {
            if (isStr(path)) path = path.split('.');

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

    /* ------------------------------ isBrowser ------------------------------ */

    var isBrowser = _.isBrowser = (function (exports)
    {
        /* Check if running in a browser.
         *
         * ```javascript
         * console.log(isBrowser); // -> true if running in a browser
         * ```
         */

        exports = typeof window === 'object' &&
                  typeof document === 'object' &&
                  document.nodeType === 9;

        return exports;
    })({});

    /* ------------------------------ raf ------------------------------ */

    var raf = _.raf = (function (exports)
    {
        /* Shortcut for requestAnimationFrame.
         *
         * Use setTimeout if native requestAnimationFrame is not supported.
         *
         * ```javascript
         * var id = raf(function tick()
         * {
         *     // Animation stuff
         *     raf(tick);
         * });
         * raf.cancel(id);
         * ```
         */

        /* dependencies
         * now isBrowser 
         */

        var raf, cancel;

        if (isBrowser)
        {
            raf = window.requestAnimationFrame;
            cancel = window.cancelAnimationFrame;

            var lastTime = 0,
                vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var i = 0, len = vendors.length; i < len && !raf; i++)
            {
                raf = window[vendors[i] + 'RequestAnimationFrame'];
                cancel = window[vendors[i] + 'CancelAnimationFrame'] ||
                         window[vendors[i] + 'CancelRequestAnimationFrame'];
            }
        }

        raf = raf || function(cb)
        {
            var curTime = now();

            var timeToCall = Math.max(0, 16 - (curTime - lastTime)),
                id = setTimeout(function() { cb(curTime + timeToCall) }, timeToCall);

            lastTime = curTime + timeToCall;

            return id;
        };

        cancel = cancel || function(id) { clearTimeout(id) };

        raf.cancel = cancel;

        exports = raf;

        return exports;
    })({});

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function ()
    {
        /* Check if keys and values in src are contained in obj.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |obj   |object |Object to inspect                 |
         * |src   |object |Object of property values to match|
         * |return|boolean|True if object is match           |
         *
         * ```javascript
         * isMatch({a: 1, b: 2}, {a: 1}); // -> true
         * ```
         */

        /* dependencies
         * keys 
         */

        function exports(obj, src)
        {
            var _keys = keys(src),
                len = _keys.length;

            if (obj == null) return !len;

            obj = Object(obj);

            for (var i = 0; i < len; i++)
            {
                var key = _keys[i];
                if (src[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        }

        return exports;
    })();

    /* ------------------------------ matcher ------------------------------ */

    var matcher = _.matcher = (function ()
    {
        /* Return a predicate function that checks if attrs are contained in an object.
         *
         * |Name  |Type    |Desc                              |
         * |------|--------|----------------------------------|
         * |attrs |object  |Object of property values to match|
         * |return|function|New predicate function            |
         *
         * ```javascript
         * var objects = [
         *     {a: 1, b: 2, c: 3 },
         *     {a: 4, b: 5, c: 6 }
         * ];
         * filter(objects, matcher({a: 4, c: 6 })); // -> [{a: 4, b: 5, c: 6 }]
         * ```
         */

        /* dependencies
         * extendOwn isMatch 
         */

        function exports(attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        }

        return exports;
    })();

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb = _.safeCb = (function (exports)
    {
        /* Create callback based on input value.
         */

        /* dependencies
         * isFn isObj optimizeCb matcher identity 
         */

        exports = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFn(val)) return optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return function (key)
            {
                return function (obj)
                {
                    return obj == null ? undefined : obj[key];
                }
            };
        };

        return exports;
    })({});

    /* ------------------------------ map ------------------------------ */

    var map = _.map = (function ()
    {
        /* Create an array of values by running each element in collection through iteratee.
         *
         * |Name    |Type        |Desc                          |
         * |--------|------------|------------------------------|
         * |obj     |array object|Collection to iterate over    |
         * |iteratee|function    |Function invoked per iteration|
         * |[ctx]   |*           |Function context              |
         * |return  |array       |New mapped array              |
         *
         * ```javascript
         * map([4, 8], function (n) { return n * n; }); // -> [16, 64]
         * ```
         */

        /* dependencies
         * safeCb keys isArrLike 
         */

        function exports(obj, iteratee, ctx)
        {
            iteratee = safeCb(iteratee, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len = (_keys || obj).length,
                results = Array(len);

            for (var i = 0; i < len; i++)
            {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iteratee(obj[curKey], curKey, obj);
            }

            return results;
        }

        return exports;
    })();

    /* ------------------------------ toArr ------------------------------ */

    var toArr = _.toArr = (function ()
    {
        /* Convert value to an array.
         *
         * |Name  |Type |Desc            |
         * |------|-----|----------------|
         * |val   |*    |Value to convert|
         * |return|array|Converted array |
         *
         * ```javascript
         * toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
         * toArr('abc'); // -> ['abc']
         * toArr(1); // -> [1]
         * toArr(null); // -> []
         * ```
         */

        /* dependencies
         * isArrLike map isArr isStr 
         */

        function exports(val)
        {
            if (!val) return [];

            if (isArr(val)) return val;

            if (isArrLike(val) && !isStr(val)) return map(val);

            return [val];
        }

        return exports;
    })();

    /* ------------------------------ Class ------------------------------ */

    var Class = _.Class = (function ()
    {
        /* Create JavaScript class.
         *
         * |Name     |Type    |Desc                             |
         * |---------|--------|---------------------------------|
         * |methods  |object  |Public methods                   |
         * |[statics]|object  |Static methods                   |
         * |return   |function|Function used to create instances|
         *
         * ```javascript
         * var People = Class({
         *     initialize: function People(name, age)
         *     {
         *         this.name = name;
         *         this.age = age;
         *     },
         *     introduce: function ()
         *     {
         *         return 'I am ' + this.name + ', ' + this.age + ' years old.'.
         *     }
         * });
         *
         * var Student = People.extend({
         *     initialize: function Student(name, age, school)
         *     {
         *         this.callSuper(People, 'initialize', arguments);
         *
         *         this.school = school;
         *     },
         *     introduce: function ()
         *     {
         *         return this.callSuper(People, 'introduce') + '\n I study at ' + this.school + '.'.
         *     }
         * }, {
         *     is: function (obj)
         *     {
         *         return obj instanceof Student;
         *     }
         * });
         *
         * var a = new Student('allen', 17, 'Hogwarts');
         * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
         * Student.is(a); // -> true
         * ```
         */

        /* dependencies
         * extend toArr inherits has safeGet 
         */

        function exports(methods, statics)
        {
            return Base.extend(methods, statics);
        }

        function makeClass(parent, methods, statics)
        {
            statics = statics || {};
            var className = methods.className || safeGet(methods, 'initialize.name') || '';
            delete methods.className;

            var ctor = new Function('toArr', 'return function ' + className + '()' + 
            '{' +
                'var args = toArr(arguments);' +
                'return this.initialize ? this.initialize.apply(this, args) || this : this;' +
            '};')(toArr);

            inherits(ctor, parent);
            ctor.prototype.constructor = ctor;

            ctor.extend = function (methods, statics)
            {
                return makeClass(ctor, methods, statics);
            };
            ctor.inherits = function (Class)
            {
                inherits(ctor, Class);
            };
            ctor.methods = function (methods)
            {
                extend(ctor.prototype, methods);
                return ctor;
            };
            ctor.statics = function (statics)
            {
                extend(ctor, statics);
                return ctor;
            };

            ctor.methods(methods).statics(statics);

            return ctor;
        }

        var Base = exports.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function (parent, name, args)
            {
                var superMethod = parent.prototype[name];

                return superMethod.apply(this, args);
            },
            toString: function ()
            {
                return this.constructor.name;
            }
        });

        return exports;
    })();

    /* ------------------------------ Select ------------------------------ */

    var Select = _.Select = (function (exports)
    {
        /* Simple wrapper of querySelectorAll to make dom selection easier.
         *
         * ### constructor
         *
         * |Name    |Type  |Desc               |
         * |--------|------|-------------------|
         * |selector|string|Dom selector string|
         *
         * ### find
         *
         * Get desdendants of current matched elements.
         *
         * |Name    |Type  |Desc               |
         * |--------|------|-------------------|
         * |selector|string|Dom selector string|
         *
         * ### each
         *
         * Iterate over matched elements.
         *
         * |Name|Type    |Desc                                |
         * |----|--------|------------------------------------|
         * |fn  |function|Function to execute for each element|
         *
         * ```javascript
         * var $test = new Select('#test');
         * $test.find('.test').each(function (idx, element)
         * {
         *     // Manipulate dom nodes
         * });
         * ```
         */

        /* dependencies
         * Class isStr each 
         */

        exports = Class({
            className: 'Select',
            initialize: function (selector)
            {
                this.length = 0;

                if (!selector) return this;

                if (isStr(selector)) return rootSelect.find(selector);

                if (selector.nodeType)
                {
                    this[0] = selector;
                    this.length = 1;
                }
            },
            find: function (selector)
            {
                var ret = new Select;

                this.each(function ()
                {
                    mergeArr(ret, this.querySelectorAll(selector));
                });

                return ret;
            },
            each: function (fn)
            {
                each(this, function (element, idx)
                {
                    fn.call(element, idx, element);
                });

                return this;
            }
        });

        var rootSelect = new exports(document);

        function mergeArr(first, second)
        {
            var len = second.length,
                i = first.length;

            for (var j = 0; j < len; j++) first[i++] = second[j];

            first.length = i;

            return first;
        }

        return exports;
    })({});

    /* ------------------------------ $safeEls ------------------------------ */

    var $safeEls = _.$safeEls = (function ()
    {
        /* Convert value into an array, if it's a string, do querySelector.
         *
         * |Name  |Type                |Desc             |
         * |------|--------------------|-----------------|
         * |value |element array string|Value to convert |
         * |return|array               |Array of elements|
         *
         * ```javascript
         * $safeEls('.test'); // -> Array of elements with test class
         * ```
         */

        /* dependencies
         * isStr toArr Select 
         */

        function exports(val)
        {
            return toArr(isStr(val) ? new Select(val) : val);
        }

        return exports;
    })();

    /* ------------------------------ $attr ------------------------------ */

    var $attr = _.$attr = (function ()
    {
        /* Element attribute manipulation.
         *
         * Get the value of an attribute for the first element in the set of matched elements.
         *
         * |Name   |Type                |Desc                            |
         * |-------|--------------------|--------------------------------|
         * |element|string array element|Elements to manipulate          |
         * |name   |string              |Attribute name                  |
         * |return |string              |Attribute value of first element|
         *
         * Set one or more attributes for the set of matched elements.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |name   |string              |Attribute name        |
         * |value  |string              |Attribute value       |
         *
         * |Name      |Type                |Desc                                  |
         * |----------|--------------------|--------------------------------------|
         * |element   |string array element|Elements to manipulate                |
         * |attributes|object              |Object of attribute-value pairs to set|
         *
         * ### remove
         *
         * Remove an attribute from each element in the set of matched elements.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |name   |string              |Attribute name        |
         *
         * ```javascript
         * $attr('#test', 'attr1', 'test');
         * $attr('#test', 'attr1'); // -> test
         * $attr.remove('#test', 'attr1');
         * $attr('#test', {
         *     'attr1': 'test',
         *     'attr2': 'test'
         * });
         * ```
         */

        /* dependencies
         * toArr isObj isStr each isUndef $safeEls 
         */

        function exports(els, name, val)
        {
            els = $safeEls(els);

            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getAttr(els[0], name);

            var attrs = name;
            if (!isObj(attrs))
            {
                attrs = {};
                attrs[name] = val;
            }

            setAttr(els, attrs);
        }

        exports.remove = function (els, names)
        {
            els = $safeEls(els);
            names = toArr(names);

            each(els, function (node)
            {
                each(names, function (name)
                {
                    node.removeAttribute(name);
                });
            });
        };

        function getAttr(el, name)
        {
            return el.getAttribute(name);
        }

        function setAttr(els, attrs)
        {
            each(els, function (el)
            {
                each(attrs, function (val, name)
                {
                    el.setAttribute(name, val);
                });
            })
        }

        return exports;
    })();

    /* ------------------------------ $data ------------------------------ */

    var $data = _.$data = (function ()
    {
        /* Wrapper of $attr, adds data- prefix to keys.
         *
         * ```javascript
         * $data('#test', 'attr1', 'eustia');
         * ```
         */

        /* dependencies
         * $attr isStr isObj each 
         */

        function exports(nodes, name, val)
        {
            var dataName = name;

            if (isStr(name)) dataName = 'data-' + name;
            if (isObj(name))
            {
                dataName = {};
                each(name, function (val, key)
                {
                    dataName['data-' + key] = val;
                });
            }

            return $attr(nodes, dataName, val);
        }

        return exports;
    })();

    /* ------------------------------ $css ------------------------------ */

    var $css = _.$css = (function ()
    {
        /* Element css manipulation.
         *
         * Get the computed style properties for the first element in the set of matched elements.
         *
         * |Name   |Type                |Desc                      |
         * |-------|--------------------|--------------------------|
         * |element|string array element|Elements to manipulate    |
         * |name   |string              |Property name             |
         * |return |string              |Css value of first element|
         *
         * Set one or more CSS properties for the set of matched elements.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |name   |string              |Property name         |
         * |value  |string              |Css value             |
         *
         * |Name      |Type                |Desc                            |
         * |----------|--------------------|--------------------------------|
         * |element   |string array element|Elements to manipulate          |
         * |properties|object              |Object of css-value pairs to set|
         *
         * ```javascript
         * $css('#test', {
         *     'color': '#fff',
         *     'background': 'black'
         * });
         * $css('#test', 'display', 'block');
         * $css('#test', 'color'); // -> #fff
         * ```
         */

        /* dependencies
         * isStr isObj camelCase kebabCase isUndef contain isNum $safeEls startWith 
         */

        function exports(nodes, name, val)
        {
            nodes = $safeEls(nodes);

            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getCss(nodes[0], name);

            var css = name;
            if (!isObj(css))
            {
                css = {};
                css[name] = val;
            }

            setCss(nodes, css);
        }

        function getCss(node, name)
        {
            return node.style[camelCase(name)];
        }

        function setCss(nodes, css)
        {
            each(nodes, function (node)
            {
                var cssText = ';';
                each(css, function (val, key)
                {
                    key = dasherize(key);
                    cssText += key + ':' + addPx(key, val) + ';';
                });
                node.style.cssText += cssText;
            });
        }

        var cssNumProps = [
            'column-count',
            'columns',
            'font-weight',
            'line-weight',
            'opacity',
            'z-index',
            'zoom'
        ];

        function addPx(key, val)
        {
            var needPx = isNum(val) && !contain(cssNumProps, kebabCase(key));

            return needPx ? val + 'px' : val;
        }

        function dasherize(str) 
        {
            // -webkit- -o- 
            if (startWith(str, '-')) return str;

            return kebabCase(str);
        }

        return exports;
    })();

    /* ------------------------------ $insert ------------------------------ */

    var $insert = _.$insert = (function (exports)
    {
        /* Insert html on different position.
         *
         * ### before
         *
         * Insert content before elements.
         *
         * ### after
         *
         * Insert content after elements.
         *
         * ### prepend
         *
         * Insert content to the beginning of elements.
         *
         * ### append
         *
         * Insert content to the end of elements.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |content|string              |Html strings          |
         *
         * ```javascript
         * // <div id="test"><div class="mark"></div></div>
         * $insert.before('#test', '<div>eris</div>');
         * // -> <div>eris</div><div id="test"><div class="mark"></div></div>
         * $insert.after('#test', '<div>eris</div>');
         * // -> <div id="test"><div class="mark"></div></div><div>eris</div>
         * $insert.prepend('#test', '<div>eris</div>');
         * // -> <div id="test"><div>eris</div><div class="mark"></div></div>
         * $insert.append('#test', '<div>eris</div>');
         * // -> <div id="test"><div class="mark"></div><div>eris</div></div>
         * ```
         */

        /* dependencies
         * each $safeEls 
         */

        exports = {
            before: insertFactory('beforebegin'),
            after: insertFactory('afterend'),
            append: insertFactory('beforeend'),
            prepend: insertFactory('afterbegin')
        };

        function insertFactory(type)
        {
            return function (nodes, val)
            {
                nodes = $safeEls(nodes);

                each(nodes, function (node)
                {
                    node.insertAdjacentHTML(type, val);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ $offset ------------------------------ */

    var $offset = _.$offset = (function ()
    {
        /* Get the position of the element in document.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to get offset|
         *
         * ```javascript
         * $offset('#test'); // -> {left: 0, top: 0, width: 0, height: 0}
         * ```
         */

        /* dependencies
         * $safeEls 
         */

        function exports(els)
        {
            els = $safeEls(els);

            var el = els[0];

            var clientRect = el.getBoundingClientRect();

            return {
                left: clientRect.left + window.pageXOffset,
                top: clientRect.top + window.pageYOffset,
                width: Math.round(clientRect.width),
                height: Math.round(clientRect.height)
            };
        }

        return exports;
    })();

    /* ------------------------------ $property ------------------------------ */

    var $property = _.$property = (function (exports)
    {
        /* Element property html, text, val getter and setter.
         *
         * ### html
         *
         * Get the HTML contents of the first element in the set of matched elements or
         * set the HTML contents of every matched element.
         *
         * ### text
         *
         * Get the combined text contents of each element in the set of matched
         * elements, including their descendants, or set the text contents of the
         * matched elements.
         *
         * ### val
         *
         * Get the current value of the first element in the set of matched elements or
         * set the value of every matched element.
         *
         * ```javascript
         * $property.html('#test', 'eris');
         * $property.html('#test'); // -> eris
         * ```
         */

        /* dependencies
         * isUndef each $safeEls 
         */

        exports = {
            html: propFactory('innerHTML'),
            text: propFactory('textContent'),
            val: propFactory('value')
        };

        function propFactory(name)
        {
            return function (nodes, val)
            {
                nodes = $safeEls(nodes);

                if (isUndef(val)) return nodes[0][name];

                each(nodes, function (node)
                {
                    node[name] = val;
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ $remove ------------------------------ */

    var $remove = _.$remove = (function ()
    {
        /* Remove the set of matched elements from the DOM.
         *
         * |Name   |Type                |Desc              |
         * |-------|--------------------|------------------|
         * |element|string array element|Elements to delete|
         *
         * ```javascript
         * $remove('#test');
         * ```
         */

        /* dependencies
         * each $safeEls 
         */

        function exports(els)
        {
            els = $safeEls(els);

            each(els, function (el)
            {
                var parent = el.parentNode;

                if (parent) parent.removeChild(el);
            });
        }

        return exports;
    })();

    /* ------------------------------ $show ------------------------------ */

    var $show = _.$show = (function ()
    {
        /* Show elements.
         *
         * |Name   |Type                |Desc            |
         * |-------|--------------------|----------------|
         * |element|string array element|Elements to show|
         *
         * ```javascript
         * $show('#test');
         * ```
         */

        /* dependencies
         * each $safeEls 
         */

        function exports(els)
        {
            els = $safeEls(els);

            each(els, function (el)
            {
                if (isHidden(el))
                {
                    el.style.display = getDefDisplay(el.nodeName);
                }
            });
        }

        function isHidden(el)
        {
            return getComputedStyle(el, '').getPropertyValue('display') == 'none';
        }

        var elDisplay = {};

        function getDefDisplay(elName)
        {
            var el, display;

            if (!elDisplay[elName])
            {
                el = document.createElement(elName);
                document.documentElement.appendChild(el);
                display = getComputedStyle(el, '').getPropertyValue('display');
                el.parentNode.removeChild(el);
                display == 'none' && (display = 'block');
                elDisplay[elName] = display;
            }

            return elDisplay[elName];
        }

        return exports;
    })();

    /* ------------------------------ delegate ------------------------------ */

    var delegate = _.delegate = (function (exports)
    {
        /* Event delegation.
         *
         * ### add
         *
         * Add event delegation.
         *
         * |Name    |Type    |Desc          |
         * |--------|--------|--------------|
         * |el      |element |Parent element|
         * |type    |string  |Event type    |
         * |selector|string  |Match selector|
         * |cb      |function|Event callback|
         *
         * ### remove
         *
         * Remove event delegation.
         *
         * ```javascript
         * var container = document.getElementById('container');
         * function clickHandler()
         * {
         *     // Do something...
         * }
         * delegate.add(container, 'click', '.children', clickHandler);
         * delegate.remove(container, 'click', '.children', clickHandler);
         * ```
         */

        /* dependencies
         * Class contain 
         */

        function retTrue()  { return true }
        function retFalse() { return false }

        function trigger(e)
        {
            var handlers = this.events[e.type],
                handler,
                handlerQueue = formatHandlers.call(this, e, handlers);

            e = new delegate.Event(e);

            var i = 0, j, matched, ret;

            while ((matched = handlerQueue[i++]) && !e.isPropagationStopped())
            {
                e.curTarget = matched.el;
                j = 0;
                while ((handler = matched.handlers[j++]) && !e.isImmediatePropagationStopped())
                {
                    ret = handler.handler.apply(matched.el, [e]);

                    if (ret === false)
                    {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }

        function formatHandlers(e, handlers)
        {
            var current = e.target,
                ret     = [],
                delegateCount = handlers.delegateCount,
                selector, matches, handler, i;

            if (current.nodeType)
            {
                for (; current !== this; current = current.parentNode || this)
                {
                    matches = [];
                    for (i = 0; i < delegateCount; i++)
                    {
                        handler = handlers[i];
                        selector = handler.selector + ' ';
                        if (matches[selector] === undefined)
                        {
                            matches[selector] = contain(this.querySelectorAll(selector), current);
                        }
                        if (matches[selector]) matches.push(handler);
                    }
                    if (matches.length) ret.push({ el: current, handlers: matches});
                }
            }

            if (delegateCount < handlers.length)
            {
                ret.push({
                    el: this,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return ret;
        }

        exports = {
            add: function (el, type, selector, fn)
            {
                var handler = {
                        selector: selector,
                        handler : fn
                    },
                    handlers;

                if (!el.events) el.events = {};

                if (!(handlers = el.events[type]))
                {
                    handlers = el.events[type] = [];
                    handlers.delegateCount = 0;
                    el.addEventListener(type, function (e)
                    {
                        trigger.apply(el, arguments);
                    }, false);
                }

                selector ? handlers.splice(handlers.delegateCount++, 0, handler)
                         : handlers.push(handler);
            },
            remove: function (el, type, selector, fn)
            {
                var events = el.events;

                if (!events || !events[type]) return;

                var handlers = events[type],
                    i = handlers.length,
                    handler;

                while (i--)
                {
                    handler = handlers[i];

                    if ((!selector || handler.selector == selector) && handler.handler == fn)
                    {
                        handlers.splice(i, 1);
                        if (handler.selector)
                        {
                            handlers.delegateCount--;
                        }
                    }
                }
            },
            Event: Class({
                className: 'Event',
                initialize: function Event(e) { this.origEvent = e },
                isDefaultPrevented: retFalse,
                isPropagationStopped: retFalse,
                isImmediatePropagationStopped: retFalse,
                preventDefault: function ()
                {
                    var e = this.origEvent;

                    this.isDefaultPrevented = retTrue;
                    if (e && e.preventDefault) e.preventDefault();
                },
                stopPropagation: function ()
                {
                    var e = this.origEvent;

                    this.isPropagationStopped = retTrue;
                    if (e && e.stopPropagation) e.stopPropagation();
                },
                stopImmediatePropagation: function ()
                {
                    var e = this.origEvent;

                    this.isImmediatePropagationStopped = retTrue;
                    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
                    this.stopPropagation();
                }
            })
        };

        return exports;
    })({});

    /* ------------------------------ $event ------------------------------ */

    var $event = _.$event = (function (exports)
    {
        /* bind events to certain dom elements.
         *
         * ```javascript
         * function clickHandler()
         * {
         *     // Do something...
         * }
         * $event.on('#test', 'click', clickHandler);
         * $event.off('#test', 'click', clickHandler);
         * ```
         */

        /* dependencies
         * delegate isUndef $safeEls 
         */

        exports = {
            on: eventFactory('add'),
            off: eventFactory('remove')
        };

        function eventFactory(type)
        {
            return function (nodes, event, selector, handler)
            {
                nodes = $safeEls(nodes);

                if (isUndef(handler))
                {
                    handler = selector;
                    selector = undefined;
                }

                each(nodes, function (node)
                {
                    delegate[type](node, event, selector, handler);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ define ------------------------------ */

    var define = _.define = (function ()
    {
        /* Define a module, should be used along with use.
         *
         * |Name      |Type    |Desc        |
         * |----------|--------|------------|
         * |name      |string  |Module name |
         * |[requires]|array   |Dependencies|
         * |method    |function|Module body |
         *
         * The module won't be executed until it's used by use function.
         *
         * ```javascript
         * define('A', function ()
         * {
         *     return 'A';
         * });
         * define('B', ['A'], function (A)
         * {
         *     return 'B' + A;
         * });
         * ```
         */

        /* dependencies
         * toArr 
         */

        function exports(name, requires, method)
        {
            if (arguments.length === 2)
            {
                method = requires;
                requires = [];
            }

            define(name, requires, method);
        }

        var modules = exports._modules = {};

        function define(name, requires, method)
        {
            modules[name] = {
                requires: toArr(requires),
                body: method
            };
        }

        return exports;
    })();

    /* ------------------------------ some ------------------------------ */

    var some = _.some = (function ()
    {
        /* Check if predicate return truthy for any element.
         *
         * |Name     |Type        |Desc                                          |
         * |---------|------------|----------------------------------------------|
         * |obj      |array object|Collection to iterate over                    |
         * |predicate|function    |Function to invoked per iteration             |
         * |ctx      |*           |Predicate context                             |
         * |return   |boolean     |True if any element passes the predicate check|
         *
         * ```javascript
         * some([2, 5], function (val)
         * {
         *     return val % 2 === 0;
         * }); // -> true
         * ```
         */

        /* dependencies
         * safeCb isArrLike keys 
         */

        function exports(obj, predicate, ctx)
        {
            predicate = safeCb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len   = (_keys || obj).length;

            for (var i = 0; i < len; i++)
            {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        }

        return exports;
    })();

    /* ------------------------------ $class ------------------------------ */

    var $class = _.$class = (function (exports)
    {
        /* Element class manipulations.
         *
         * ### add
         *
         * Add the specified class(es) to each element in the set of matched elements.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |names  |string array        |Classes to add        |
         *
         * ### has
         *
         * Determine whether any of the matched elements are assigned the given class.
         *
         * |Name   |Type                |Desc                                 |
         * |-------|--------------------|-------------------------------------|
         * |element|string array element|Elements to manipulate               |
         * |name   |string              |Class name                           |
         * |return |boolean             |True if elements has given class name|
         *
         * ### toggle
         *
         * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |name   |string              |Class name to toggle  |
         *
         * ### remove
         *
         * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
         *
         * |Name   |Type                |Desc                  |
         * |-------|--------------------|----------------------|
         * |element|string array element|Elements to manipulate|
         * |names  |string              |Class names to remove |
         *
         * ```javascript
         * $class.add('#test', 'class1');
         * $class.add('#test', ['class1', 'class2']);
         * $class.has('#test', 'class1'); // -> true
         * $class.remove('#test', 'class1');
         * $class.has('#test', 'class1'); // -> false
         * $class.toggle('#test', 'class1');
         * $class.has('#test', 'class1'); // -> true
         * ```
         */

        /* dependencies
         * toArr some $safeEls isStr 
         */

        exports = {
            add: function (els, name)
            {
                els = $safeEls(els);
                var names = safeName(name);

                each(els, function (el)
                {
                    var classList = [];

                    each(names, function (name)
                    {
                        if (!exports.has(el, name)) classList.push(name);
                    });

                    if (classList.length !== 0) el.className += ' ' + classList.join(' ');
                });
            },
            has: function (els, name)
            {
                els = $safeEls(els);

                var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');

                return some(els, function (el)
                {
                    return regName.test(el.className);
                });
            },
            toggle: function (els, name)
            {
                els = $safeEls(els);

                each(els, function (el)
                {
                    if (!exports.has(el, name)) return exports.add(el, name);

                    exports.remove(el, name);
                });
            },
            remove: function (els, name)
            {
                els = $safeEls(els);
                var names = safeName(name);

                each(els, function (el)
                {
                    each(names, function (name)
                    {
                        el.classList.remove(name);
                    });
                });
            }
        };

        function safeName(name)
        {
            return isStr(name) ? name.split(/\s/) : toArr(name);
        }

        return exports;
    })({});

    /* ------------------------------ $ ------------------------------ */

    _.$ = (function ()
    {
        /* jQuery like style dom manipulator.
         *
         * ### Available methods
         *
         * offset, hide, show, first, last, get, eq, on, off, html, text, val, css, attr,
         * data, rmAttr, remove, addClass, rmClass, toggleClass, hasClass, append, prepend,
         * before, after
         *
         * ```javascript
         * var $btn = $('#btn');
         * $btn.html('eustia');
         * $btn.addClass('btn');
         * $btn.show();
         * $btn.on('click', function ()
         * {
         *     // Do something...
         * });
         * ```
         */

        /* dependencies
         * Select $offset $show $css $attr $property last $remove $data $event $class $insert isUndef isStr 
         */

        function exports(selector)
        {
            return new Select(selector);
        }

        Select.methods({
            offset: function ()
            {
                return $offset(this);
            },
            hide: function ()
            {
                return this.css('display', 'none');
            },
            show: function ()
            {
                $show(this);

                return this;
            },
            first: function ()
            {
                return exports(this[0]);
            },
            last: function () {
                return exports(last(this));
            },
            get: function (idx)
            {
                return this[idx];
            },
            eq: function (idx)
            {
                return exports(this[idx]);
            },
            on: function (event, selector, handler)
            {
                $event.on(this, event, selector, handler);

                return this;
            },
            off: function (event, selector, handler)
            {
                $event.off(this, event, selector, handler);

                return this;
            },
            html: function (val)
            {
                var result = $property.html(this, val);

                if (isUndef(val)) return result;

                return this;
            },
            text: function (val)
            {
                var result = $property.text(this, val);

                if (isUndef(val)) return result;

                return this;
            },
            val: function (val)
            {
                var result = $property.val(this, val);

                if (isUndef(val)) return result;

                return this;
            },
            css: function (name, val)
            {
                var result = $css(this, name, val);

                if (isGetter(name, val)) return result;

                return this;
            },
            attr: function (name, val)
            {
                var result = $attr(this, name, val);

                if (isGetter(name, val)) return result;

                return this;
            },
            data: function (name, val)
            {
                var result = $data(this, name, val);

                if (isGetter(name, val)) return result;

                return this;
            },
            rmAttr: function (name)
            {
                $attr.remove(this, name);

                return this;
            },
            remove: function ()
            {
                $remove(this);

                return this;
            },
            addClass: function (name)
            {
                $class.add(this, name);

                return this;
            },
            rmClass: function (name)
            {
                $class.remove(this, name);

                return this;
            },
            toggleClass: function (name)
            {
                $class.toggle(this, name);

                return this;
            },
            hasClass: function (name)
            {
                return $class.has(this, name);
            },
            parent: function ()
            {
                return exports(this[0].parentNode);
            },
            append: function (val)
            {
                $insert.append(this, val);

                return this;
            },
            prepend: function (val)
            {
                $insert.prepend(this, val);

                return this;
            },
            before: function (val)
            {
                $insert.before(this, val);

                return this;
            },
            after: function (val)
            {
                $insert.after(this, val);

                return this;
            }
        });

        function isGetter(name, val)
        {
            return isUndef(val) && isStr(name);
        }

        return exports;
    })();

    /* ------------------------------ restArgs ------------------------------ */

    var restArgs = _.restArgs = (function ()
    {
        /* This accumulates the arguments passed into an array, after a given index.
         *
         * |Name      |Type    |Desc                                   |
         * |----------|--------|---------------------------------------|
         * |function  |function|Function that needs rest parameters    |
         * |startIndex|number  |The start index to accumulates         |
         * |return    |function|Generated function with rest parameters|
         *
         * ```javascript
         * var paramArr = _.restArgs(function (rest) { return rest });
         * paramArr(1, 2, 3, 4); // -> [1, 2, 3, 4]
         * ```
         */

        function exports(fn, startIdx)
        {
            startIdx = startIdx == null ? fn.length - 1 : +startIdx;

            return function ()
            {
                var len = Math.max(arguments.length - startIdx, 0),
                    rest = new Array(len),
                    i;

                for (i = 0; i < len; i++) rest[i] = arguments[i + startIdx];

                // Call runs faster than apply.
                switch (startIdx)
                {
                    case 0: return fn.call(this, rest);
                    case 1: return fn.call(this, arguments[0], rest);
                    case 2: return fn.call(this, arguments[0], arguments[1], rest);
                }

                var args = new Array(startIdx + 1);

                for (i = 0; i < startIdx; i++) args[i] = arguments[i];

                args[startIdx] = rest;

                return fn.apply(this, args);
            };
        }

        return exports;
    })();

    /* ------------------------------ partial ------------------------------ */

    var partial = _.partial = (function (exports)
    {
        /* Partially apply a function by filling in given arguments.
         *
         * |Name    |Type    |Desc                                    |
         * |--------|--------|----------------------------------------|
         * |fn      |function|Function to partially apply arguments to|
         * |partials|...*    |Arguments to be partially applied       |
         * |return  |function|New partially applied function          |
         *
         * ```javascript
         * var sub5 = partial(function (a, b) { return b - a }, 5);
         * sub(20); // -> 15
         * ```
         */

        /* dependencies
         * restArgs toArr 
         */

        exports = restArgs(function (fn, partials)
        {
            return function ()
            {
                var args = [];

                args = args.concat(partials);
                args = args.concat(toArr(arguments));

                return fn.apply(this, args);
            };
        });

        return exports;
    })({});

    /* ------------------------------ once ------------------------------ */

    var once = _.once = (function (exports)
    {
        /* Create a function that invokes once.
         *
         * |Name  |Type    |Desc                   |
         * |------|--------|-----------------------|
         * |fn    |function|Function to restrict   |
         * |return|function|New restricted function|
         *
         * ```javascript
         * function init() {};
         * var initOnce = once(init);
         * initOnce();
         * initOnce(); // -> init is invoked once
         * ```
         */

        /* dependencies
         * partial before 
         */

        exports = partial(before, 2);

        return exports;
    })({});

    /* ------------------------------ Emitter ------------------------------ */

    var Emitter = _.Emitter = (function (exports)
    {
        /* Event emitter class which provides observer pattern.
         *
         * ### on
         *
         * Bind event.
         *
         * ### off
         *
         * Unbind event.
         *
         * ### once
         *
         * Bind event that trigger once.
         *
         * |Name    |Type    |Desc          |
         * |--------|--------|--------------|
         * |event   |string  |Event name    |
         * |listener|function|Event listener|
         *
         * ### emit
         *
         * Emit event.
         *
         * |Name   |Type  |Desc                        |
         * |-------|------|----------------------------|
         * |event  |string|Event name                  |
         * |...args|*     |Arguments passed to listener|
         *
         * ### mixin
         *
         * [static] Mixin object class methods.
         *
         * |Name|Type  |Desc           |
         * |----|------|---------------|
         * |obj |object|Object to mixin|
         *
         * ```javascript
         * var event = new Emitter();
         * event.on('test', function () { console.log('test') });
         * event.emit('test'); // Logs out 'test'.
         * Emitter.mixin({});
         * ```
         */

        /* dependencies
         * Class has each slice once 
         */

        exports = Class({
            initialize: function Emitter()
            {
                this._events = this._events || {};
            },
            on: function (event, listener)
            {
                this._events[event] = this._events[event] || [];
                this._events[event].push(listener);

                return this;
            },
            off: function (event, listener)
            {
                if (!has(this._events, event)) return;

                this._events[event].splice(this._events[event].indexOf(listener), 1);

                return this;
            },
            once: function (event, listener)
            {
                this.on(event, once(listener));

                return this;
            },
            emit: function (event)
            {
                if (!has(this._events, event)) return;

                var args = slice(arguments, 1);

                each(this._events[event], function (val)
                {
                    val.apply(this, args);
                }, this);

                return this;
            }
        }, {
            mixin: function (obj)
            {
                each(['on', 'off', 'once', 'emit'], function (val)
                {
                    obj[val] = Emitter.prototype[val];
                });

                obj._events = obj._events || {};
            }
        });

        return exports;
    })({});

    /* ------------------------------ State ------------------------------ */

    var State = _.State = (function (exports)
    {
        /* Simple state machine.
         *
         * Extend from Emitter.
         *
         * ### constructor
         *
         * |Name   |Type  |Desc                  |
         * |-------|------|----------------------|
         * |initial|string|Initial state         |
         * |events |string|Events to change state|
         *
         * ### is
         *
         * Check current state.
         *
         * |Name  |Type   |Desc                                    |
         * |------|-------|----------------------------------------|
         * |value |string |State to check                          |
         * |return|boolean|True if current state equals given value|
         *
         * ```javascript
         * var state = new State('empty', {
         *     load: {from: 'empty', to: 'pause'},
         *     play: {from: 'pause', to: 'play'},
         *     pause: {from: ['play', 'empty'], to: 'pause'},
         *     unload: {from: ['play', 'pause'], to: 'empty'}
         * });
         *
         * state.is('empty'); // -> true
         * state.load();
         * state.is('pause'); // -> true
         * state.on('play', function (src)
         * {
         *     console.log(src); // -> 'eustia'
         * });
         * state.on('error', function (err, event)
         * {
         *     // Error handler
         * });
         * state.play('eustia');
         * ```
         */

        /* dependencies
         * Emitter each isArr some slice toArr 
         */

        exports = Emitter.extend({
            className: 'State',
            initialize: function (initial, events)
            {
                this.callSuper(Emitter, 'initialize');

                this.current = initial;

                var self = this;

                each(events, function (event, key)
                {
                    self[key] = buildEvent(key, event);
                });
            },
            is: function (state)
            {
                return this.current === state;
            }
        });

        function buildEvent(name, event)
        {
            var from = toArr(event.from),
                to = event.to;

            return function ()
            {
                var args = toArr(arguments);
                args.unshift(name);

                var hasEvent = some(from, function (val)
                {
                    return this.current === val;
                }, this);

                if (hasEvent)
                {
                    this.current = to;
                    this.emit.apply(this, args);
                } else
                {
                    this.emit('error', new Error(this.current + ' => ' + to + ' error'), name);
                }
            };
        }

        return exports;
    })({});

    /* ------------------------------ Tween ------------------------------ */

    _.Tween = (function (exports)
    {
        /* Tween engine for JavaScript animations.
         *
         * Extend from Emitter.
         *
         * ### constructor
         *
         * |Name|Type  |Desc           |
         * |----|------|---------------|
         * |obj |object|Values to tween|
         *
         * ### to
         *
         * |Name       |Type           |Desc            |
         * |-----------|---------------|----------------|
         * |destination|obj            |Final properties|
         * |duration   |number         |Tween duration  |
         * |ease       |string function|Easing function |
         *
         * ### play
         *
         * Begin playing forward.
         *
         * ### pause
         *
         * Pause the animation.
         *
         * ### paused
         *
         * Get animation paused state.
         *
         * ### progress
         *
         * Update or get animation progress.
         *
         * |Name      |Type  |Desc                  |
         * |----------|------|----------------------|
         * |[progress]|number|Number between 0 and 1|
         *
         * ```javascript
         * var pos = {x: 0, y: 0};
         *
         * var tween = new Tween(pos);
         * tween.on('update', function (target)
         * {
         *     console.log(target.x, target.y);
         * }).on('end', function (target)
         * {
         *     console.log(target.x, target.y); // -> 100, 100
         * });
         * tween.to({x: 100, y: 100}, 1000, 'inElastic').play();
         * ```
         */

        /* dependencies
         * Emitter State easing now each raf isFn 
         */

        exports = Emitter.extend({
            className: 'Tween',
            initialize: function (target)
            {
                this.callSuper(Emitter, 'initialize', arguments);

                this._target = target;
                this._dest = {};
                this._duration = 0;
                this._progress = 0;
                this._origin = {};
                this._diff = {};
                this._ease = easing['linear'];
                this._state = new State('pause', {
                    play: {from: 'pause', to: 'play'},
                    pause: {from: 'play', to: 'pause'}
                });
            },
            to: function (props, duration, ease)
            {
                var origin = {},
                    target = this._target,
                    diff = {};

                ease = ease || this._ease;

                this._dest = props;
                this._duration = duration || this._duration;
                this._ease = isFn(ease) ? ease : easing[ease];

                each(props, function (val, key)
                {
                    origin[key] = target[key];
                    diff[key] = val - origin[key];
                });

                this._origin = origin;
                this._diff = diff;

                return this;
            },
            progress: function (progress)
            {
                var ease = this._ease,
                    target = this._target,
                    origin = this._origin,
                    diff = this._diff,
                    dest = this._dest,
                    self = this;

                if (progress != null)
                {
                    progress = progress < 1 ? progress : 1;
                    this._progress = progress;

                    each(dest, function (val, key)
                    {
                        target[key] = origin[key] + diff[key] * ease(progress);
                    });

                    self.emit('update', target);

                    return this;
                }

                return this._progress;
            },
            play: function ()
            {
                var state = this._state;

                if (state.is('play')) return;

                state.play();

                var startTime = now(),
                    progress = this._progress,
                    duration = this._duration * (1 - progress),
                    target = this._target,
                    self = this;

                function render()
                {
                    if (state.is('pause')) return;

                    var time = now();

                    self.progress(progress + (time - startTime) / duration);

                    if (self._progress === 1)
                    {
                        state.pause();
                        self.emit('end', target);
                        return;
                    }

                    raf(render);
                }

                raf(render);

                return this;
            },
            pause: function ()
            {
                var state = this._state;

                if (state.is('pause')) return;
                state.pause();

                return this;
            },
            paused: function ()
            {
                return this._state.is('pause');
            }
        });

        return exports;
    })({});

    /* ------------------------------ use ------------------------------ */

    _.use = (function ()
    {
        /* Use modules that is created by define.
         *
         * |Name      |Type    |Desc                |
         * |----------|--------|--------------------|
         * |[requires]|array   |Dependencies        |
         * |method    |function|Codes to be executed|
         *
         * ```javascript
         * define('A', function ()
         * {
         *     return 'A';
         * });
         * use(['A'], function (A)
         * {
         *     console.log(A + 'B'); // -> 'AB'
         * });
         * ```
         */

        /* dependencies
         * map define has toArr 
         */

        function exports(requires, method)
        {
            if (method == null)
            {
                method = requires;
                requires = [];
            }

            requires = map(toArr(requires), function (val)
            {
                return require(val);
            });

            method.apply(null, requires);
        }

        var modules = define._modules;

        var requireMarks = {};

        function require(name)
        {
            if (has(requireMarks, name)) return modules[name];

            var requires = modules[name].requires,
                body = modules[name].body,
                len = requires.length;

            for (var i = 0; i < len; i++) requires[i] = require(requires[i]);

            var exports = body.apply(null, requires);
            if (exports) modules[name] = exports;

            requireMarks[name] = true;

            return modules[name];
        }

        return exports;
    })();

    return _;
})();