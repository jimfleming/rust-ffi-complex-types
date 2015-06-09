pub struct Args {
    init: usize,
    by: usize,
}

pub struct Counter {
    val: usize,
    by: usize,
}

impl Counter {
    pub fn new(args: Args) -> Counter {
        Counter{
            val: args.init,
            by: args.by,
        }
    }

    pub fn get(&self) -> usize {
        self.val
    }

    pub fn incr(&mut self) -> usize {
        self.val = self.val + self.by;
        self.val
    }

    pub fn decr(&mut self) -> usize {
        self.val = self.val - self.by;
        self.val
    }
}
