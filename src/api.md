---
layout: api.jade
---

As a matter of fact, there's only one useful command **build** so far:(

```bash
eustia <command> [<options>]
```

## Build

Build JavaScript libraries by scanning files.

When used in command line, the rest arguments will be treated as files.

|name|shorthand|default|description|
|----------------------------------|
|exclude|e||Functions excluded|
|encoding||utf-8|Input file encoding|
|files||['\*.html', '\*.js']|Files to scan|
|include|i||Functions included|
|ignore|||Files excluded|
|library|l||External library paths|
|namespace|n|_|Namespace of generated library|
|output|o|util.js|Output path|
|pattern|p|umd|Module pattern, commonjs, umd or global|
|watch|w|false|Watch files to regenerate automatically|

## Docs

Generate documentation.

|name|shorthand|default|description|
|----------------------------------|
|encoding||utf-8|Input file encoding|
|input|||Generated eustia library|
|output|o|docs.html|Output path|
|raw|r|false|Output json|
|title|t|Eustia Documentation|Documentation title|

## Help

Display help information.

|name|shorthand|default|description|
|----------------------------------|
|command|c||Command name|

## Version

Display version info.
