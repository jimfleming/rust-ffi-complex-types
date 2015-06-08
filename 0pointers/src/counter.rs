pub struct Counter {
    val: usize
}

impl Counter {
    pub fn new(val: usize) -> Counter {
        Counter{val: val}
    }

    pub fn get(&self) -> usize {
        self.val
    }

    pub fn incr(&mut self, by: usize) -> usize {
        self.val = self.val + by;
        self.val
    }

    pub fn decr(&mut self, by: usize) -> usize {
        self.val = self.val - by;
        self.val
    }
}
