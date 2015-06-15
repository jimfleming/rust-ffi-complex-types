var ffi = require("ffi");
var assert = require("assert");

// Describe our FFI functions, their return types and arguments.
var lib = ffi.Library("target/debug/libcounter", {
  "createCounter": [ "pointer", [ "uint32" ] ],
  "destroyCounter": [ "void", [ "pointer" ] ],
  "getCounterValue": [ "uint32", [ "pointer" ] ],
  "incrementCounterBy": [ "uint32", [ "pointer", "uint32" ] ],
  "decrementCounterBy": [ "uint32", [ "pointer", "uint32" ] ]
});

class Counter {
  constructor(value = 0) {
    this.ptr = lib.createCounter(value);
  }

  get() {
    return lib.getCounterValue(this.ptr);
  }

  incrementBy(by) {
    return lib.incrementCounter(this.ptr, by);
  }

  decrementBy(by) {
    return lib.decrementCounter(this.ptr, by);
  }

  destroy() {
    lib.destroyCounter(this.ptr);
  }
}

var counter = new Counter(7);

var val = counter.get();
console.log("created counter", val);
assert.equal(val, 7, "unexpected initial counter value");

val = counter.incremetBy(3);
console.log("val", val);
assert.equal(val, 10, "unexpected increment result");

val = counter.incremetBy(2);
console.log("val", val);
assert.equal(val, 12, "unexpected increment result");

val = counter.decremetBy(1);
console.log("val", val);
assert.equal(val, 11, "unexpected decrement result");

counter.destroy();
console.log("destroyed counter");
