var regBlockCmt = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

extractBlockCmt = function (src) { return src.match(regBlockCmt) };