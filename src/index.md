---
layout: index.jade
---

## What's the Goal

**Eustia** is a tool for building your own JavaScript utility libraries. When we create a new project, usually the first thing we do is choosing a JavaScript library that provides useful programming helpers to make our lives easier. At this point, we think of open source JavaScript libraries such as **underscore.js** or **lodash**. However, there are times that we just want to use one or two of its functions. Moreover, the function helper we just need doesn't exist in it. And most of the time, we ended up extracting code from those libraries and writing extra helpers ourselves. This is the problem that Eustia is trying to solve.

## How it Works

The tool will scan your source code to find strings that match the pattern **_.method** , then generates a JavaScript library containing only the methods you have used. It provides most of underscore's functions and some other useful small libraries, for example, ajax, Class, cookie helpers. You can also collect your own modules and methods to create libraries for multiple projects.

## The Benefits

### 1. No more copying and Pasting.

When creating a new project with a util module, you don't have to copy the code manually from the other old projects you have written. Just run a command, and everything will be just ready for you.

### 2. Reusable code.

Util functions are reusable in this case since the whole idea is to break the utility library into small LEGO bricks. With those, you're able to construct any library you want. Besides, you can even share your LEGO with other folks, reducing pain for everybody.

### 3. Share the same piece of code both in server side and client side.

The generated library follows the UMD(Universal Module Definition) patterns so that it can used both in server side(Node.js) and client side(Browser). Using the same utility library not only makes code reusable but also keeps consistency between two sides.

### 4. Keep it small.

While developing in the mobile platform, the size of JavaScript library do matter. Since the tool scan the source code and only generates what you need, the result is definitely the smallest one with no redundant code.

### 5. Provide many useful utilities in default.

Eustia is a tool for generating libraries. However, it also provides a lot of common helpers in default. You can check the full list of [functions](http://liriliri.github.io/eustia/function.html), [modules](http://liriliri.github.io/eustia/module.html) and [classes](http://liriliri.github.io/eustia/class.html) to choose what you really need.