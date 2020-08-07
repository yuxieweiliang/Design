var Child = new Class(Person);

Child.include({
    init: function() {
        this.data = {
            name: '111111111111'
        };
        this.setStore({
            a: 'a',
            b: 'b'
        });
        this.setStore({
            a: 'aaaa',
            c: 'cccccccccccc'
        });
        // this.method.toString();
        // this.api.getUser();

        this.on(TYPE.LOGIN, this.proxy(this.click))

    },
    click: function(arg) {
        //
        console.log('login:arg => ', arg);
        console.log('login:noe => ', this, this.getStore('d'))
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

