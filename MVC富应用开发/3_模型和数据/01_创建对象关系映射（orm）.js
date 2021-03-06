

if(! typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }
}

var Model = {
  inherited: function() {},
  created: function() {},
  prototype: {
    init: function() {}
  },
  create: function() {
    var object = Object.create(this);

    object.parent = this;
    object.prototype = object.fn = Object.create(this.prototype);

    object.created();
    this.inherited(object);
    return object;
  },
  init: function() {
    var instance = Object.create(this.prototype);
    instance.parent = this;
    instance.init.apply(instance, arguments);
    return instance;
  },
  include: function(o) {
    var included = o.included;
    $.extend(this.prototype, o);
    if(included) included(this);
  },
  extend: function(o) {
    var extended = o.extended;
    $.extend(this, o);
    if(extended) extended(this);
  }
};



var Asset = Model.create();
var User = Model.create();

var user = User.init();
