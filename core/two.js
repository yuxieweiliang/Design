var Child = new Class(Person);

Child.include({
    init: function() {
        this.data = {
            name: '222222222'
        };
        // this.method.toString();
        // this.api.getUser();

        this.on(TYPE.LOGIN, this.proxy(this.click))

    },
    click: function(arg) {
        //
        console.log('login:arg => ', Person.emit);
        console.log('login:arg => ', arg);
        console.log('login:two => ', this, this.getStore())
    },
    other () {
        console.log('other: => ', this)
    }
});

child = new Child();

child.setStore({
    d: 'd'
});

child.emit(TYPE.LOGIN, {a: 'a', b: 'b'});

$('#btn').click(child.proxy(child.other));
