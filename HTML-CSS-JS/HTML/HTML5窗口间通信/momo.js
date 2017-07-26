importScripts('randNum.js');
self.onmessage = function(ev) {
    var arr = randNum(ev.data, ev.data / 10);
    self.postMessage(arr);
};
