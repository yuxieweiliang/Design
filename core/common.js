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
        this.Person = 'Person'
    },
    save: function(){},
    destroy: function(){},
    click: function() {
        // this.elem.click(this.proxy(this.click));
    }
});
