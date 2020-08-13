var Person = new Class();

/**
 * 添加在 { 类 } 上的静态方法
 */
Person.extend({
    find: function() {
        return '1'
    },
    exists: function() {}
});

/**
 * 添加在 { 原型 } 上的公共方法
 */
Person.include(PubSub);
Person.include({
    init() {
        this.Person = 'Person';
    },
    save: function(){},
    destroy: function(){}
});

Person.mixin(function (klass) {
    klass.createDefine(Person, '__data', {});

    klass.fn.setStore = function (obj) {
        for (var key in obj) {
            Person.__data[key] = obj[key];
        }
        return this
    };
    klass.fn.getStore = function (key) {
        return key ? Person.__data[key] : Person.__data
    };
});

