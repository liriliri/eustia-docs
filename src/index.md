---
layout: index.jade
---

**Eustia** will scan your source code to find strings that match the pattern
**util.method**, **util = require('./util')** or **import {...} from './util'**,
then generates a JavaScript library containing only the methods you have used.
It provides most of underscore's functions and some other useful small
modules, for example, Class, cookie helpers. You can also collect and build your
own modules to create libraries for multiple projects.

![Eustia screen shot](//7xn2zy.com1.z0.glb.clouddn.com/eustia_screenshot.gif)

## Installation

You can install Eustia using Node Package Manager(**npm**).

```bash
npm install -g eustia
```

## Quick Example

Suppose you want to use trim function in index.html, just write the code
down as follows:

```html
<html>
<head>
    <meta charset="utf-8"/>
    <title>Eustia</title>
    <script src="util.js"></script>
</head>
<body>
    <script>
    var projectName = _.trim(' Eustia ');
    // Some code...
    </script>
</body>
</html>
```

Run command:

```bash
eustia build
```

The tool will scan you html code and generate a file name **util.js**
(Default output file name). And that is it, everything is just done!
