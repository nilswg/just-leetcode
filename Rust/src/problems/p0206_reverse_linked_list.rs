// 解題思路
//
// let mut head = Some(Box::new(Node {
//     val: 1,
//     next: Some(Box::new(Node {
//         val: 2,
//         next: Some(Box::new(Node {
//             val: 3,
//             next: Some(Box::new(Node {
//                 val: 4,
//                 next: Some(Box::new(Node { val: 5, next: None })),
//             })),
//         })),
//     })),
// }));
//
// T = 0
//
// res        head
// [{None}]   [ {1, next->[..]} ]
//
//
// T = 1
//
// res                       head                    node
// [{None}]                  [               ]       {1, next->[2..]}
//
//                                                   // 透過 let Some(node) = head，取出node
//
// res                       head                    node
// [{None}]                  [{2, next->[3..]}]      {1, next->[  ]}
//
//                                                   //head = node.next;
//
// res                       head                    node
// [      ]                  [{2, next->[3..]}]      {1, next->[{None}]}
//
//                                                   // node.next = res;
//
// res                       head                    node
// [{1, next->[{None}]}]     [{2, next->[3..]}]      None
//


// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
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

pub struct Solution {}
impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut res = None;
        let mut head = head;
        while let Some(mut node) = head {
            head = node.next;
            node.next = res;
            res = Some(node);
        }
        res
    }
}

#[allow(dead_code)]
pub fn main() {
    fn get(v: Vec<i32>) -> Option<Box<ListNode>> {
        let mut head: Option<Box<ListNode>> = None;
        let mut curr = &mut head;

        for e in v {
            curr = &mut curr.insert(Box::new(ListNode::new(e))).next;
        }

        head
    }

    fn is_equal(mut l1: Option<Box<ListNode>>, mut l2: Option<Box<ListNode>>) -> bool {
        while l1.is_some() && l2.is_some() {
            if l1.as_ref().unwrap().val != l2.as_ref().unwrap().val {
                return false;
            }
            l1 = l1.unwrap().next;
            l2 = l2.unwrap().next;
        }

        if l1.is_some() || l2.is_some() {
            return false;
        }

        return true;
    }
    fn test_case(v1: Vec<i32>, expect: Vec<i32>) -> bool {
        let ans = get(expect);
        let out = Solution::reverse_list(get(v1));
        is_equal(out, ans)
    }

    println!("Start p0206_reverse_list testing...");

    println!("{}", test_case(vec![1, 2, 3, 4, 5], vec![5, 4, 3, 2, 1]));
    println!("{}", test_case(vec![1, 2], vec![2, 1]));
    println!("{}", test_case(vec![], vec![]));

    println!("All Testing Passed ✅");
}


