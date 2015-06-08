var ffi = require("ffi");
var assert = require("assert");

var lib = ffi.Library("target/debug/libcounter", {
  "createCounter": [ "pointer", [ "size_t"] ],
  "destroyCounter": [ "void", [ "pointer" ] ],
  "getCounterValue": [ "size_t", [ "pointer" ] ],
  "incrementCounterBy": [ "size_t", [ "pointer", "size_t" ] ],
  "decrementCounterBy": [ "size_t", [ "pointer", "size_t" ] ]
});

var ptr = lib.createCounter(7);

var val = lib.getCounterValue(ptr);
console.log("created counter", val);
assert.equal(val, 7, "unexpected initial counter value");

val = lib.incrementCounterBy(ptr, 3);
console.log("val", val);
assert.equal(val, 10, "unexpected increment result");

val = lib.incrementCounterBy(ptr, 2);
console.log("val", val);
assert.equal(val, 12, "unexpected increment result");

val = lib.decrementCounterBy(ptr, 1);
console.log("val", val);
assert.equal(val, 11, "unexpected decrement result");

lib.destroyCounter(ptr);
console.log("destroyed counter");
