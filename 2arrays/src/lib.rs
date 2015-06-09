#![allow(non_snake_case)]

mod counter;

use counter::Counter;
use std::mem::transmute;

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
pub extern fn incrementCounterBy(ptr: *mut Counter, bys_ptr: *const usize, bys_len: usize) -> usize {
    let mut _counter = unsafe { &mut *ptr };
    let bys = unsafe { std::slice::from_raw_parts(bys_ptr, bys_len) };
    _counter.incr(bys)
}

#[no_mangle]
pub extern fn decrementCounterBy(ptr: *mut Counter, bys_ptr: *const usize, bys_len: usize) -> usize {
    let mut _counter = unsafe { &mut *ptr };
    let bys = unsafe { std::slice::from_raw_parts(bys_ptr, bys_len) };
    _counter.decr(bys)
}

#[no_mangle]
pub extern fn destroyCounter(ptr: *mut Counter) {
    let _counter: Box<Counter> = unsafe{ transmute(ptr) };
    // Drop
}
