var PubSub = {
  // subscribe
  on: function(ev, callback) {
    // 创建 _callbacks 对象， 除非它已经存在
    var calls = this._cbs || (this._cbs = {});

    (calls[ev] || (calls[ev] = [])).push(callback);
    return this
  },
  // publish
  emit: function() {
    var args = Array.prototype.slice.call(arguments, 0);

    // 拿出第一个参数，即事件名称
    var ev = args.shift();
    var list, calls, i, l;
    if(!(calls = this._cbs)) return this;
    if(!(list = calls[ev])) return this;

    for(i = 0, l = list.length; i < l; i++) {
      list[i].apply(this, args);
    }
    return this
  }
};
