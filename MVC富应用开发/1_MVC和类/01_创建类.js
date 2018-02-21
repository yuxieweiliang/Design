
var Class = function() {
  var klass = function() {
    this.init.apply(this, arguments);
  };
  klass.prototype.init = function() {};

  // 定义prototype别名
  klass.fn = klass.prototype;
  // 定义类的别名
  klass.fn.parent = klass;

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