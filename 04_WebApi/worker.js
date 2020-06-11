addEventListener('message', function () {
  console.log('worker1');
  self.postMessage('Work done!');
  self.close();
});

self.addEventListener('message', function () {
  console.log('worker2');
  self.postMessage('Work done!');
  self.close();
});

this.addEventListener('message', function () {
  console.log('worker3');
  self.postMessage('Work done!');
  self.close();
});

onmessage = function () {
  console.log('worker4');
  self.postMessage('Work done!');
  self.close();
};
// 会覆盖前一个
this.onmessage = function () {
  console.log('worker5');
  self.postMessage('Work done!');
  self.close();
};
// 会覆盖前一个
self.onmessage = function () {
  console.log('worker6');
  self.postMessage('Work done!');
  self.close();
};

// console.log(new WorkerGlobalScope())
console.log(JSON.parse(JSON.stringify(self.location)))
console.log(JSON.parse(JSON.stringify(self.navigator)))
