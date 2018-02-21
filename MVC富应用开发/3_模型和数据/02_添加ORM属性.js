
// 添加属性
$.extend(Model, {
  find: function() {}
});

// 添加原形方法
$.extend(Model.prototype, {
  init: function(attrs) {
    if(attrs) this.load(attrs);
  },
  load: function(attributes) {
    for(var name in attributes) {
      this[name] = attributes[name];
    }
  }
});


// var asset = Asset.init({name: '123'});