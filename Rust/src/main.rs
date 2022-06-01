mod quizzes;
use quizzes::q0001_two_sum;
use quizzes::q0002_add_two_numbers;

#[derive(Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}
fn main() {
    q0001_two_sum::main();
    q0002_add_two_numbers::main();
    // let mut b = Some(ListNode::new(0));

    // println!("{:?}", &b);
    // println!("{:?}", &b.as_mut());
    // println!("{:?}", &b.as_mut().unwrap());

    // let t = &mut b.as_mut().unwrap().val;
    // *t += 1;

    // println!("{}", &b.as_ref().unwrap().val);

    // 一般 1
    // binary assignment operation `+=` cannot be applied to type `Box<{integer}>`
    // Student {}
    //
}
