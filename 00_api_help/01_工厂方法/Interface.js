function Interface(name, methods) {
  if(arguments.length > 2) {
    throw new Error('参数必须为两位');
  }
  this.name = name;
  this.methods = [];
  for (let i = 0; i < methods.length; i++){
    const func = methods[i];
    if(typeof func !== 'string') {
      throw new Error('非法函数名！');
    }
    this.methods.push(func);
  }
}

Interface.ensureImplements = function (obj) {
  for(let i = 1; i < arguments.length; i++) {
    const _interface = arguments[i];
    if(_interface.constructor !== Interface) {
      throw new Error('非接口类型！');
    }
    for(let j = 0; j < _interface.methods.length; j++) {
      const method = _interface.methods[j];
      if(!obj[method] || typeof obj[method] !== 'function') {
        throw new Error(method + '方法不存在！');
      }
    }
  }
};
