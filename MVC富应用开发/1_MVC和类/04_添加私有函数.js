/* var Class = */(function(exports) {

  exports.Class = function(parent) {
  //}
  //return function(parent) {

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

    // 给实例添加属性 也就是原型上的方法
    klass.create = function(obj) {
      var createApi = obj.createApi;

      // 创建一个函数保存一下当前状态。
      var create = function(key, i, func) {

        if(typeof func === 'function') {

          klass.fn[key][i] = function() {

            return func.apply(klass.fn, arguments);
          };
        } else {

          klass.fn[key][i] = func;
        }
      };

      // 循环obj， 将所有的东西加载到原型上
      for(var key in obj) {

        klass.fn[key] = klass.fn[key] || {};

        for(var i in obj[key]) {
          create(key, i, obj[key][i])


        }
      }
      if(createApi) createApi(klass)

    };


    klass.fn.setData = function(obj) {
      klass.fn.data = klass.fn.data || {};

      for(var key in obj) {

        klass.fn.data[key] = obj[key];
      }
      console.log(klass.fn);
    };

    return klass;
  };
})(window);
