_('now');

var interval = 1000 / 60;

exports = window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function (cb) { setTimeout(function () { cb(now()) }, interval) };
