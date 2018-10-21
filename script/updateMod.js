const request = require('request')
const fs = require('fs')

const util = require('../lib/util')

const INDEX_URL =
  'https://raw.githubusercontent.com/liriliri/licia/master/index.json'
let index = {}

request(INDEX_URL, function(err, res, body) {
  if (err) return console.log(err)

  index = JSON.parse(body)

  fs.writeFile('src/licia.json', JSON.stringify(index, null, 4), function() {})

  requestDoc(
    'module',
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC.md',
    'en'
  )
  requestDoc(
    'module_cn',
    'https://raw.githubusercontent.com/liriliri/licia/master/doc/DOC_CN.md',
    'cn'
  )
})

function requestDoc(name, url, lang) {
  request(url, function(err, res, body) {
    if (err) return console.log(err)

    body = addDesc(body, lang)
    body = addLink(body)

    var data = '---\nlayout: module.jade\ntitle: Module\n---\n\n' + body

    fs.writeFile(`src/${name}.md`, data, 'utf-8', function(err) {
      if (err) console.log(err)
    })
  })
}

function addDesc(body, lang) {
  if (lang === 'en') {
    return body.replace(/^#.*/, function() {
      return [
        '[English](/module.html) [中文](/module_cn.html)',
        'All source code is [hosted on GitHub](https://github.com/liriliri/licia).',
        'Feel free to report issues and make pull requests:)',
        'Use as an npm package:',
        '```bash\nnpm i licia --save\n```',
        "```javascript\nvar uuid = require('licia/uuid');\n\nconsole.log(uuid()); // -> 0e3b84af-f911-4a55-b78a-cedf6f0bd815\n```"
      ].join('\n\n')
    })
  } else if (lang === 'cn') {
    return (
      [
        '[English](/module.html) [中文](/module_cn.html)',
        '所有源代码均[托管在 GitHub 上](https://github.com/liriliri/licia).',
        '如果发现 bug 或有改进意见，可以到上边地址发起 issue 帮助我们让该项目变得更好:)',
        '使用 npm 安装：',
        'Use as an npm package:',
        '```bash\nnpm i licia --save\n```',
        "```javascript\nvar uuid = require('licia/uuid');\n\nconsole.log(uuid()); // -> 0e3b84af-f911-4a55-b78a-cedf6f0bd815\n```"
      ].join('\n\n') +
      '\n\n' +
      body
    )
  }

  return body
}

function addLink(body) {
  return body.replace(/^##\s+([\w$]+)/gm, function(match, name) {
    var source =
      'https://github.com/liriliri/licia/blob/master/' +
      name[0].toLowerCase() +
      '/' +
      name

    var ret =
      match +
      '\n\n[source](' +
      source +
      '.js) ' +
      '[test](' +
      source +
      '.test.js)'

    if (util.safeGet(index, [name, 'benchmark'])) {
      ret += ' [benchmark](' + source + '.benchmark.js)'
    }

    if (util.safeGet(index, [name, 'demo'])) {
      ret += ' [demo](/demo/' + name + '.html)'
    }

    var env = index[name].env,
      envHtml = ''

    if (env === 'browser' || env === 'all')
      envHtml += '<i class="env iconfont icon-browser"></i>'
    if (env === 'node' || env === 'all')
      envHtml += '<i class="env iconfont icon-nodejs"></i>'

    ret += envHtml

    return ret
  })
}
