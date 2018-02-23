
var Class = (function(exports) {

  return function(parent) {
    var klass = function() {
      this.init.apply(this, arguments);
    };

    if(parent) {
      var subclass = function() {};
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
    }

    klass.prototype.init = function() {};
    // 定义prototype别名
    klass.fn = klass.prototype;

    // 添加一个委托函数，更改函数的上下文。
    klass.proxy = function(func) {
      var _this = this;
      return(function() {
        return func.apply(_this, arguments)
      })
    };
    klass.fn.proxy = klass.proxy;

    // 定义类的别名
    klass.fn.parent = klass;

    klass._super = klass.__proto__;

    // 给类添加属性 是属性及属性方法
    klass.extend = function(obj) {
      var extended = obj.extended;

      for(var i in obj) {
        klass[i] = obj[i];
      }
      if(extended) extended(klass)
    };

    // 给实例添加属性 也就是原型上的方法
    klass.include = function(obj) {
      var included = obj.included;
      // delete klass.prototype.__proto__.parent
      // delete klass.prototype.__proto__.proxy

      for(var i in obj) {
          klass.fn[i] = obj[i];
        // delete klass.prototype.__proto__.init
      }

      if(included) included(klass)

    };

    return klass;
  };
})(window);