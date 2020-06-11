  Buffer ---> ArrayBuffer
    function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
    }
    return ab;
  }


  ArrayBuffer ---> Buffer:
    function toBuffer(ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
    }
    return buf;
  }
