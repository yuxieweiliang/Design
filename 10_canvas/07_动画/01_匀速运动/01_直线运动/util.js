// immediate ===  true 则只在每次运动开始执行一次

var debounce = function (func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;
    // if (args) result = func.apply(context, args);
  };

  var debounced = function (args) {
    // 一旦存在timeout， 意味之前尝试调用过func
    // 由于debounce只认最新的一次调用， 所以之前等待执行的func都会被终止
    if (timeout) clearTimeout(timeout);
    // 如果允许新的调用尝试立即执行，
    if (immediate) {
      // 如果之前尚没有调用尝试，那么此次调用可以立马执行，否则一定得等待之前的执行完毕
      var callNow = !timeout;
      // 刷新timeout
      timeout = setTimeout(later, wait);
      // 如果能被立即执行，立即执行
      if (callNow) result = func.apply(this, args);
    } else {
      // 否则，这次尝试调用会延时wait个时间
      // timeout = delay(later, wait, this, args);
      timeout = setTimeout(function (context, args) {
        clearTimeout(timeout);
        timeout = null;
        result = func.apply(context, args);
      }, wait);
    }

    return result;
  };
  return debounced;
};

var throttle = function (func, wait, options) {

  var timeout, context, args, result;
  // 最近一次func被调用的时间点
  var previous = 0;
  if (!options) options = {};

  // 创建一个延后执行的函数包裹住func的执行过程
  var later = function () {
    // 执行时，刷新最近一次调用时间
    previous = options.leading === false ? 0 : new Date();
    // 清空定时器
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  // 返回一个throttled的函数
  var throttled = function () {
    // ----- 节流函数开始执行----
    // 我们尝试调用func时，会首先记录当前时间戳
    var now = new Date();
    // 是否是第一次调用
    if (!previous && options.leading === false) previous = now;
    // func还要等待多久才能被调用 =  预设的最小等待期-（当前时间-上一次调用的时间）
    // 显然，如果第一次调用，且未设置options.leading = false，那么remaing=0，func会被立即执行
    var remaining = wait - (now - previous);
    // 记录之后执行时需要的上下文和参数
    context = this;
    args = arguments;

    // 如果计算后能被立即执行
    if (remaining <= 0 || remaining > wait) {
      // 清除之前的“最新调用”
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      // 刷新最近一次func调用的时间点
      previous = now;
      // 执行func调用
      result = func.apply(context, args);
      // 如果timeout被清空了，
      if (!timeout) context = args = null;

    } else if (!timeout && options.trailing !== false) {
      // 如果设置了trailing edge，那么暂缓此次调用尝试的执行
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  // 可以取消函数的节流化
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};