/**
 * 兼容动画
 */
;(function() {
  var originalWebkitMethod,
    wrapper = undefined,
    callback = undefined,
    geckoVersion = 0,
    userAgent = navigator.userAgent,
    index = 0,
    self = this;

  // chrome
  if(window.webkitRequestAnimationFrame) {
    wrapper = function(time) {
      if(time === undefined) {
        time = + new Date();
      }
      self.callback(time)
    }
    originalWebkitMethod = window.webkitRequestAnimationFrame;

    window.webkitRequestAnimationFrame = function(cb, ele) {
      self.callback = callback;
      originalWebkitMethod(wrapper, ele)
    }
  }

  // firefox
  if(window.mozRequestAnimationFrame) {
    index = userAgent.indexOf('rv:');
    if(userAgent.indexOf('Gecko') !== -1) {
      geckoVersion = userAgent.substr(index + 3, 3);
      if(geckoVersion === '2.0') {
        window.mozRequestAnimationFrame = undefined;
      }
    }
  }


  function animation(cb, ele) {
    var self = this,
      start,
      finish;
    window.setTimeout(function() {
      start = + new Date();
      cb(start);
      finish = + new Date();

      self.timeout = 1000 / 60 - (finish - start)

    }, self.timeout)
  }
  if(!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || animation
    })()
  }
})();


