var ffi = require("ffi");
var assert = require("assert");

// Describe our API"s functions, their return types and arguments.
var lib = ffi.Library("target/debug/libcounter", {
  "createCounter": [ "pointer", [ "size_t" ] ],
  "destroyCounter": [ "void", [ "pointer" ] ],
  "getCounterValue": [ "size_t", [ "pointer" ] ],
  "incrementCounterBy": [ "size_t", [ "pointer", "size_t" ] ],
  "decrementCounterBy": [ "size_t", [ "pointer", "size_t" ] ]
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
