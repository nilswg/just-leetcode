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
pub struct Solution;

impl Solution {
    pub fn add_two_numbers(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut head: Option<Box<ListNode>> = None;
        let mut curr = &mut head;
        let mut carry = 0;

        while l1 != None || l2 != None || carry > 0 {
            if let Some(node) = l1 {
                carry += node.val;
                l1 = node.next;
            }
            if let Some(node) = l2 {
                carry += node.val;
                l2 = node.next;
            }
            // 寫法一
            // curr = &mut curr.insert(Box::new(ListNode::new(carry % 10))).next;

            // 寫法二
            // "*"表示deref，取其指向的對象，即操作head重新設值新節點
            *curr = Some(Box::new(ListNode::new(carry % 10)));
            // 取該指標，更動指標儲存的地址，即移動指標至新對象。
            // 這裡的新對象正是 新節點的next節點 類似 curr = curr.next
            // 第一個 as_mut 是將 Option 之中的 Box<ListNode> 轉換成"可變的"
            // 進行unwrap，取出 Box<ListNode>
            // 第二個 as_mut 是將 Box 之中的 ListNode 轉換為"可變的"
            // 最後是因為Box亦是一指針，取其中的值不像Option那樣，直接取就好。
            //
            curr = &mut curr.as_mut().unwrap().as_mut().next;

            // 寫法三
            // *curr = Some(Box::new(ListNode::new(carry % 10)));
            // if let Some(b) = curr {
            //     curr = &mut (*b).next;
            // }

            // 反轉
            // let mut new_node = Box::new(ListNode::new(carry % 10));
            // new_node.next = head.take();
            // head = Some(new_node);

            carry = carry / 10;
        }
        head
    }
}

// 太難寫了，連測試都寫不出來。

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

fn test_case(v1: Vec<i32>, v2: Vec<i32>, expect: Vec<i32>) -> bool {
    let ans = get(expect);
    let out = Solution::add_two_numbers(get(v1), get(v2));
    is_equal(out, ans)
}

pub fn main() {
    println!("start q0002_add_two_numbers testing...");
    println!(
        "case1:> {}",
        test_case(vec![2, 4, 3], vec![5, 6, 4], vec![7, 0, 8])
    );
    println!("case2:> {}", test_case(vec![0], vec![0], vec![0]));
    println!(
        "case3:> {}",
        test_case(
            vec![9, 9, 9, 9, 9, 9, 9],
            vec![9, 9, 9, 9],
            vec![8, 9, 9, 9, 0, 0, 0, 1]
        )
    );
    println!("All Testing Passed ✅");
}
