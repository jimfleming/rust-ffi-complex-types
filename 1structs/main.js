var ffi = require("ffi");
var assert = require("assert");

var ref = require("ref");
var StructType = require("ref-struct");

var usize = ref.types.size_t;

// Define a struct type with properties matching the order and type of the
// receiving struct type.
var Args = StructType({
  init: usize,
  by: usize
});

var lib = ffi.Library("target/debug/libcounter", {
  "createCounter": [ "pointer", [ Args ] ],
  "destroyCounter": [ "void", [ "pointer" ] ],
  "getCounterValue": [ "size_t", [ "pointer" ] ],
  "incrementCounterBy": [ "size_t", [ "pointer" ] ],
  "decrementCounterBy": [ "size_t", [ "pointer" ] ]
});

var ptr = lib.createCounter(new Args({ init: 4, by: 2 }));

var val = lib.getCounterValue(ptr);
console.log("created counter", val);
assert.equal(val, 4, "unexpected initial counter value");

val = lib.incrementCounterBy(ptr);
console.log("val", val);
assert.equal(val, 6, "unexpected increment result");

val = lib.incrementCounterBy(ptr);
console.log("val", val);
assert.equal(val, 8, "unexpected increment result");

val = lib.decrementCounterBy(ptr);
console.log("val", val);
assert.equal(val, 6, "unexpected decrement result");

lib.destroyCounter(ptr);
console.log("destroyed counter");
