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

Person.initMixin(function (klass) {
    klass.fn.setData = function (obj) {
        this.data = klass.data || {};

        for (var key in obj) {

            this.data[key] = obj[key];
        }
    };
});
