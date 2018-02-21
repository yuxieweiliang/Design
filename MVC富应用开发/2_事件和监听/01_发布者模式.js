
var PubSub = {
  subscribe: function(ev, callback) {
    // 创建 _callbacks 对象， 除非它已经存在
    var calls = this._callbacks || (this._callbacks = {});

    (this._callbacks[ev] || (this._callbacks[ev] = []).push(callback));
  },
  publish: function() {
    var args = Array.prototype.slice.call(arguments, 0);

    // 拿出第一个参数，即事件名称
    var ev = args.shift();
    var list, calls, i, l;
    if(!(calls = this._callbacks)) return this;
    if(!(list = this._callbacks[ev])) return this;

    for(i = 0, l = list.length; i < l; i++) {
      list[i].apply(this, args);
    }
    return this
  }
};