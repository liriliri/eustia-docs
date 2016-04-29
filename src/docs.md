---
layout: docs.jade
title: Guide
---

# Table of Contents

<div class="toc" markdown="1">

<ul>
    <li>
        <a href="#basic-usage">1. Basic Usage</a>
        <ul>
            <li><a href="#install-via-npm">1.1 Install via npm</a></li>
            <li><a href="#syntax-supported">1.2 Syntax supported</a></li>
            <li><a href="#run-in-command-prompt">1.3 Run in command prompt</a></li>
            <li><a href="#run-through-configuration-file">1.4 Run through configuration file</a></li>
            <li><a href="#use-in-javascript">1.5 Use in JavaScript</a></li>
        </ul>
    </li>
    <li>
        <a href="#commands">2. Commands</a>
        <ul>
            <li><a href="#build-command">2.1 Build command</a></li>
            <li><a href="#search-command">2.2 Search command</a></li>
            <li><a href="#install-command">2.3 Install command</a></li>
            <li><a href="#docs-command">2.4 Docs command</a></li>
        </ul>
    </li>
    <li>
        <a href="#create-module">3. Create Module</a>
    </li>
    <li>
        <a href="#relative-projects">4. Relative Projects</a>
    </li>
</ul>

</div>

## Basic Usage

### Install via npm

You can install Eustia using Node Package Manager(**npm**).

```bash
npm install -g eustia
```

### Syntax supported

Eustia scans code files to find the modules you need with three types of syntax
supported, **global**, **commonjs** and **es6**.

```html
<html>
<head>
    ...
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

```javascript
var util = require('./util');

var projectName = util.trim(' Eustia ');
// Some code...
```

```javascript
import {trim} from './util'

var projectName = trim(' Eustia ');
// Some code...
```

### Run in command prompt

You can use Eustia with command lines totally. It usually follows the same
pattern described below:

```bash
eustia <command> [<options>]
```

For example:

```bash
eustia build -o util.js index.html *.js ...<list of files to be scanned>
```

### Run through configuration file

It's also possible to use a configuration file to save settings. This is pretty
helpful especially when you want to generate multiple utility libraries for
different sections of your website.

Just create a file named .eustia in your project root.

```json
{
    "files": "./layout/**/*.jade",
    "output": "./static/js/eustia.js"
}
```

Running Eustia without any sub commands, the tool will find **.eustia** under
current working directory to read configuration to generate libraries. It is
almost the same as running [build command](#build-command) from console, just 
a different way of passing options.

Configuration can be written in json format or js format.

```javascript
module.exports = {
    page: {
        files: "./layout/**/*.jade",
        output: "./static/js/eustia.js"
    },
    node: {
        files: ["./lib/*.js", "./tool/**/*.js"],
        output: "./lib/util.js"
    },
    ...
};
```

Obviously, multiple configuration is also supported. To specify which task to
run, just append the task name after command name.

```bash
eustia <task-name>
```

> Configuration could be overwritten by command line options.

### Use in JavaScript

To use Eustia from JavaScript(NodeJs), install it locally first.

```bash
npm install eustia --save-dev
```

Then require and run it by passing options just the same as a configuration file.

```javascript
var eustia = require('eustia');

eustia.build({
    files: './layout/**/*.jade',
    output: './static/js/eustia.js',
    ...
}, function ()
{
    // callback
});
```

## Commands

### Build command

Build JavaScript libraries by scanning files. When used in command line, the
rest arguments will be treated as files.

```bash
eustia build [<options>]
eustia build index.html
eustia build index.html src/*.js
eusita build index.html src/*.js -o lib.js
```

|name       |shorthand|default             |description                                 |
|---------------------------------------------------------------------------------------|
|encoding   |         |utf-8               |Input file encoding                         |
|exclude    |e        |                    |Functions excluded                          |
|extension  |         |js                  |Module extension, useful for transpilers    |
|files      |         |['\*.html', '\*.js']|Files to scan                               |
|format     |f        |umd                 |Module pattern, commonjs, umd or global     |
|include    |i        |                    |Functions included                          |
|ignore     |         |                    |Files excluded                              |
|library    |l        |                    |External library paths                      |
|namespace  |n        |_                   |Namespace of generated library              |
|output     |o        |util.js             |Output path                                 |
|transpilers|         |                    |Use for writing modules in different formats|
|watch      |w        |false               |Watch files to regenerate automatically     |

> **Transpilers** and **extension** are not available via command line
arguments, use them only in configurations.

### Search command

Search for [modules](http://liriliri.github.io/eustia/eris.html) directly
through command line.

```bash
eustia search <keyword>
```

|name  |shorthand|default|description                        |
|------------------------------------------------------------|
|update|u        |false  |Update module data before searching|

### Install command

Install module in current project directory.

```bash
eustia install [<modules>]
```

### Docs command

Generate documentation from generated utiltiy libraries.

```bash
eustia docs [<options>]
eustia docs util.js -o docs.html
```

|name       |shorthand|default             |description                          |
|--------------------------------------------------------------------------------|
|description|d        |                    |Extra description markdown file path |
|format     |f        |html                |Output format, html, json or markdown|
|output     |o        |docs.html           |Output path                          |
|title      |t        |Eustia Documentation|Documentation title                  |

## Create Module

Materials must be prepared first to cook a good meal. Right now, our materials 
is a bunch of small modules. Eustia provides many 
[utilities](http://liriliri.github.io/eustia/eris.html) itself(currently under 
development). Still, there are times you want to add your own ones. 
To achieve that, create a directory named **eustia** in the root directory.

Now, let's say I want to have a function to compare version numbers. The first 
step is to create a js file named **compareVersion.js** in **eustia** directory. 
Then fills it with actual codes to finish the procedure.

```javascript
// eustia/compareVersion.js
_('isStr each'); // dependencies

// export object
exports = function (v1, v2)
{
    if (!isStr(v1) || !isStr(v2)) return;
    ...
};
```

Now you can use **compareVersion** anywhere in your project.

> Using option **library** allows you to search functions in other paths, 
quite useful when sharing functions among several projects. Besides, **Lodash** 
functions is available by using 
[eustia-lodash](https://github.com/liriliri/eustia-lodash).

## Relative Projects

[eris: Eustia official modules(updated everyday)](https://github.com/liriliri/eris)

[eustia-babel: Allow modules to be written in es6.](https://github.com/liriliri/eustia-babel)

[eustia-component: Allow modules to be written in html-like style.](https://github.com/liriliri/eustia-component)

[eustia-json: Allow modules to be writen in json format.](https://github.com/liriliri/eustia-json)

[eustia-lodash: Allow using lodash functions.](https://github.com/liriliri/eustia-lodash)
