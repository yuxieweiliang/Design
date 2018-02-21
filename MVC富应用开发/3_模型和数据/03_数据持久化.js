Model.records = {};

Model.include({
  newRecord: true,

  create: function() {
    if(!this.id) this.id = Math.guid();
    this.newRecord = false;

    this.parent.records[this.id] = this;
  },
  destroy: function() {
    delete this.parent.records[this.id];
  }
});

Model.include({
  update: function() {
    this.parent.records[this.id] = this;
  }
});

Model.include({
  save: function() {
    this.newRecord ? this.create() : this.update();
  }
});

Model.extend({
  find: function(id) {
    if(this.records[id]) {
      return this.records[id]
    }
     throw 'Unknown record';
  }
});


var asset = Asset.init();
asset.name = 'same, same';
asset.id = 1;
asset.save();

var asset2 = Asset.init();
asset2.name = 'but different';
asset2.id = 2;
asset2.save();

console.log(Asset.find('1'));
