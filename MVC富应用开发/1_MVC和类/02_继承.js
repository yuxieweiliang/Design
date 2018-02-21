
var Class = function(parent) {
  var klass = function() {
    this.init.apply(this, arguments);
  };
  klass.prototype.init = function() {};

  // 是否需要继承
  if(parent) {
    var subclass = function() {};
    subclass.prototype = parent.prototype;
    klass.prototype = new subclass;
  }

  // 定义prototype别名
  klass.fn = klass.prototype;
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
    for(var i in obj) {
      klass.fn[i] = obj[i];
    }
    if(included) included(klass)

  };

  return klass;
};