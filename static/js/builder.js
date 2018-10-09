_.ready(function() {
  var $buildBtn = _.$('#build-btn'),
    $clearBtn = _.$('#clear-btn'),
    $input = _.$('#input-modules'),
    $buildModules = _.$('#build-modules'),
    $downloadBtn = _.$('#download-btn')

  var localStore = window.localStorage

  logger.init()

  $buildBtn.on('click', function(e) {
    e.preventDefault()

    startBuild()
  })

  $clearBtn.on('click', function(e) {
    e.preventDefault()

    $input.val('')
  })

  function startBuild() {
    var modules = _.trim($input.val())

    modules = _.filter(modules.split(/\s+/), function(name) {
      return name !== ''
    })

    modules = _.unique(modules)

    if (modules.length === 0) return

    $buildBtn.addClass('disabled')
    $clearBtn.addClass('disabled')
    $downloadBtn.addClass('disabled')

    var startTime = _.now()

    build(modules, function(err, output) {
      $buildBtn.rmClass('disabled')
      $clearBtn.rmClass('disabled')

      if (err) {
        logger.log(err.message)
        logger.log('TASK ABORT.')
        return
      }

      logger.log('TIME COST %dms.', _.now() - startTime)

      enableDownload(output)
    })

    localStore.setItem(INPUT_STORE_NAME, $input.val())
  }

  var INPUT_STORE_NAME = 'buildModules'

  $input.on('input', function() {
    $buildModules.show()
    logger.reset()
    disableDownload()
  })

  $buildModules.on('click', 'li', function() {
    var $this = _.$(this),
      name = $this.text(),
      val = ''

    if (name === 'allBrowser' || name === 'allNode' || name === 'all') {
      if (name !== 'all') {
        var exclude = name === 'allBrowser' ? 'node' : 'browser'
      }
      $buildModules.find('li').each(function() {
        var $this = _.$(this),
          env = $this.data('env')
        if (name === 'all') {
          if (env === 'all') val += ' ' + $this.text()
          return
        }
        if (env && env !== exclude) val += ' ' + $this.text()
      })
    } else {
      val = $input.val()
      val += ' ' + name
    }

    $input.val(_.trim(val))
  })

  var lastVal = localStore.getItem(INPUT_STORE_NAME)

  if (lastVal) $input.val(lastVal)

  var url = new _.Url()
  if (url.query.module) {
    $input.val(url.query.module)
    startBuild()
  }
})

function build(modules, cb) {
  logger.clear()

  logger.log('MODULES INCLUDED')
  logger.log(modules.join(' '))

  _.$('#build-modules').hide()

  _.waterfall([_.partial(downloadMod, modules), concatMod], function(
    err,
    output
  ) {
    if (err) return cb(err)

    cb(null, output)
  })
}

function enableDownload(output) {
  var $btn = _.$('#download-btn')

  $btn.rmClass('disabled')
  $btn.attr('href', _.createUrl(output))
  $btn.get(0).click()
}

function disableDownload() {
  _.$('#download-btn').addClass('disabled')
}

function concatMod(codes, cb) {
  var code = '',
    dependencyGraph = [],
    allDependencies = [],
    codesMap = {}

  codes = codes.sort(function(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1

    return 0
  })

  _.each(codes, function(code) {
    var dependencies = code.dependencies

    dependencyGraph.push(['', code.name])
    _.each(dependencies, function(dependency) {
      dependencyGraph.push([dependency, code.name])
      allDependencies.push(dependency)
    })

    codesMap[code.name] = code.code
  })

  allDependencies = _.unique(allDependencies)

  var codesOrder = _.topoSort(dependencyGraph)
  codesOrder.shift()

  for (var i = 0, len = codesOrder.length; i < len; i++) {
    var name = codesOrder[i],
      c = codesMap[name]

    if (!_.contain(allDependencies, name)) {
      c = _.trim(c.replace('var ' + name + ' = ', ''))
    }

    code += c
    if (i !== len - 1) code += '\n\n'
  }

  code = _.indent(code).replace(/\n\s*\n/g, '\n\n')

  logger.log('MODULES GENERATED')
  logger.log(codesOrder.sort().join(' '))

  var output = codesTpl({ code: code })

  cb(null, output)
}

function downloadMod(modules, cb) {
  var codes = [],
    map = {}

  download(modules.shift())

  function download(name) {
    if (map[name])
      return modules.length > 0 ? download(modules.shift()) : cb(null, codes)

    moduleStore.get(name, function(err, data) {
      if (err) return cb(err)

      map[name] = true
      codes.push(data)
      modules = modules.concat(data.dependencies)
      modules.length > 0 ? download(modules.shift()) : cb(null, codes)
    })
  }
}

var moduleStore = {
  get: function(name, cb) {
    if (this.cache[name]) {
      var cache = this.cache[name],
        dependencies = cache.dependencies

      return _.nextTick(function() {
        logger.log(
          'BUILD MODULE %s ' +
            (_.isEmpty(dependencies) ? '' : '<= ' + dependencies.join(' ')),
          name
        )
        cb(null, cache)
      })
    }

    this._fetch(name, cb)
  },
  _fetch: function(name, cb) {
    var url =
      'https://raw.githubusercontent.com/liriliri/licia/master/' +
      name[0].toLowerCase() +
      '/' +
      name +
      '.js'

    var self = this

    logger.log('DOWNLOAD %s FROM %s', name, url)

    _.fetch(url, {
      method: 'GET'
    })
      .then(function(res) {
        if (!res.ok) {
          if (res.status === 404) {
            throw Error(_.format('MODULE %s NOT FOUND', name))
          } else {
            throw Error(_.format('DOWNLOAD %s FAILED', name))
          }
        }

        return res.text()
      })
      .then(function(data) {
        self._insert(name, data)
        cb(null, self.cache[name])
      })
      .catch(function(err) {
        cb(err)
      })
  },
  _insert: function(name, data) {
    var dependencies = regDependency.exec(data)
    dependencies = dependencies ? _.trim(dependencies[1]).split(/\s+/) : []

    data = _.indent(
      data.replace(regDependency, '\n\n/* dependencies\n * $1 \n */')
    )
    data = codeTpl({
      name: name,
      code: _.trim(data),
      noFnExports: !regFnExports.test(data),
      hasExports: regExports.test(data)
    })

    logger.log(
      'BUILD MODULE %s ' +
        (_.isEmpty(dependencies) ? '' : '<= ' + dependencies.join(' ')),
      name
    )

    this.cache[name] = {
      dependencies: dependencies,
      name: name,
      code: data
    }
  },
  cache: {}
}

var logger = {
  init: function() {
    this._$el = _.$('#build-logger')
    this._initHtml = this._$el.html()
  },
  log: function() {
    this._$el.append(
      '<li class="log">' + _.escape(_.format.apply(null, arguments)) + '</li>'
    )
  },
  reset: function() {
    this._$el.html(this._initHtml)
  },
  clear: function() {
    this._$el.html('')
  }
}

var regDependency = /\s*\b_\(\s*['"]([\w\s$]+)['"]\s*\);?/m,
  regExports = /\bexports\b/,
  regFnExports = /function\s+exports\s*\(/

var codeTpl = _.template(
  [
    '/* ------------------------------ <%-name%> ------------------------------ */',
    '<%if (hasExports) {%>',
    'var <%-name%> = _.<%-name%> = (function (<%if (noFnExports) {%>exports<%}%>) {',
    '    <%=code%>\n',
    '    return exports;',
    '})(<%if (noFnExports) {%>{}<%}%>);',
    '<%} else {%>',
    '(function () {',
    '<%=code%>',
    '})();',
    '<%}%>'
  ].join('\n')
)

var codesTpl = _.template(
  [
    '// Built by eustia.',
    '(function(root, factory) {',
    "    if (typeof define === 'function' && define.amd) {",
    '        define([], factory);',
    "    } else if (typeof module === 'object' && module.exports) {",
    '        module.exports = factory();',
    '    } else { root._ = factory(); }',
    '}(this, function () {',
    '    var _ = {};\n',
    '<%=code%>\n',
    '    return _;',
    '}));'
  ].join('\n')
)
