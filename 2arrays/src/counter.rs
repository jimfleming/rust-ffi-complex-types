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

    pub fn incr(&mut self, bys: &[usize]) -> usize {
        for by in bys {
            self.val = self.val + by;
        }
        self.val
    }

    pub fn decr(&mut self, bys: &[usize]) -> usize {
        for by in bys {
            self.val = self.val - by;
        }
        self.val
    }
}
