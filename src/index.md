---
layout: index.jade
---

## What's the goal

**Eustia** is a tool for building your own JavaScript utility libraries. When we create a new project, usually the first thing we do is choosing a JavaScript library that provides useful programming helpers to make our lives easier. At this point, we think of open source JavaScript libraries such as **underscore.js** or **lodash**. However, there are times that we just want to use one or two of its functions. Moreover, the function helper we just need doesn't exist in it. And most of the time, we ended up extracting code from those libraries and writing extra helpers ourselves. This is the problem that Eustia is trying to solve.

## How it Works

The tool will scan your source code to find strings that match the pattern **_.method** , then generates a JavaScript library containing only the methods you have used. It provides most of underscore's functions and some other useful small libraries, for example, ajax, Class, cookie helpers. You can also collect your own modules and methods to create libraries for multiple projects.

