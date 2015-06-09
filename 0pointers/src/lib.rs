#![allow(non_snake_case)]

mod counter;

use counter::Counter;
use std::mem::transmute;

/// Allocate a new counter on the heap and return its pointer.
///
/// Dereferencing is preferred over transmute here since it's generally slightly more restrictive.
#[no_mangle]
pub extern fn createCounter(val: usize) -> *mut Counter {
    let _counter = &mut *Box::new(Counter::new(val));
    _counter
}

#[no_mangle]
pub extern fn getCounterValue(ptr: *mut Counter) -> usize {
    let mut _counter = unsafe { &mut *ptr };
    _counter.get()
}

#[no_mangle]
pub extern fn incrementCounterBy(ptr: *mut Counter, by: usize) -> usize {
    let mut _counter = unsafe { &mut *ptr };
    _counter.incr(by)
}

#[no_mangle]
pub extern fn decrementCounterBy(ptr: *mut Counter, by: usize) -> usize {
    let mut _counter = unsafe { &mut *ptr };
    _counter.decr(by)
}

/// Transmute the ptr back into its box so it can be dropped.
///
/// We could use Box::from_raw but it's currently unstable.
#[no_mangle]
pub extern fn destroyCounter(ptr: *mut Counter) {
    let _counter: Box<Counter> = unsafe{ transmute(ptr) };
    // Drop
}
