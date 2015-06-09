var ffi = require("ffi");
var assert = require("assert");

var ref = require("ref");
var ArrayType = require("ref-array");

// Define a new array type.
var USizeArray = ArrayType(ref.types.size_t);

var lib = ffi.Library("target/debug/libcounter", {
  "createCounter": [ "pointer", [ "size_t" ] ],
  "destroyCounter": [ "void", [ "pointer" ] ],
  "getCounterValue": [ "size_t", [ "pointer" ] ],
  "incrementCounterBy": [ "size_t", [ "pointer", USizeArray, "size_t" ] ],
  "decrementCounterBy": [ "size_t", [ "pointer", USizeArray, "size_t" ] ]
});

var ptr = lib.createCounter(4);

var val = lib.getCounterValue(ptr);
console.log("created counter", val);
assert.equal(val, 4, "unexpected initial counter value");

var bys = new USizeArray([1, 1, 2]);
val = lib.incrementCounterBy(ptr, bys, bys.length);
console.log("val", val);
assert.equal(val, 8, "unexpected increment result");

bys = new USizeArray([2, 2, 1]);
val = lib.incrementCounterBy(ptr, bys, bys.length);
console.log("val", val);
assert.equal(val, 13, "unexpected increment result");

bys = new USizeArray([0, 3, 5]);
val = lib.decrementCounterBy(ptr, bys, bys.length);
console.log("val", val);
assert.equal(val, 5, "unexpected decrement result");

lib.destroyCounter(ptr);
console.log("destroyed counter");
