
function Factory() {}

Factory.prototype = {
  peopleType: function (type) {
    let ren = null;
    switch (type) {
      case 'white':
        ren = new WhitePeople();
        break;
      case 'black':
        ren = new BlackPeople();
        break;
      case 'yellow':
        ren = new YellowPeople();
        break;
      default:
        ren = new YaPeople();
    }
    Interface.ensureImplements(ren, Ren);
    return ren;
  }
};
