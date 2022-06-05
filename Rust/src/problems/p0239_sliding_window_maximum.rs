use std::collections::VecDeque;

pub struct Solution {}

impl<'a> Solution {
    fn brute_force(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut res = vec![];
        let min = -10000i32;
        let k = k as usize;
        for i in 0..nums.len() - k + 1 {
            let mut max = min;
            for j in i..(i + k) {
                max = max.max(nums[j])
            }
            res.push(max);
        }
        res
    }

    // Runtime: 65 ms, faster than 95.38% of Rust online submissions for Sliding Window Maximum.
    // Memory Usage: 3.3 MB, less than 98.46% of Rust online submissions for Sliding Window Maximum.
    fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut res = vec![];
        let mut q = &mut VecDeque::new();
        let k = (k as usize).min(nums.len());  //修正k的大小不得超過 nums的長度。

        let quene_push = |q: &'a mut VecDeque<usize>, i: usize| -> &'a mut VecDeque<usize> {
            while let Some(&j) = q.back() {
                if nums[i] >= nums[j] {
                    q.pop_back();
                } else {
                    break;
                }
            }
            q.push_back(i);
            q
        };

        let quene_pop = |q: &'a mut VecDeque<usize>, i: usize| -> &'a mut VecDeque<usize> {
            if let Some(&j) = q.front() {
                if j as i32 <= (i as i32 - k as i32) {
                    q.pop_front();
                }
            }
            q
        };
        for i in 0..nums.len() {
            q = quene_push(q, i);
            if i >= k - 1 {
                q = quene_pop(q, i);
                res.push(nums[q[0]]);
            }
        }
        res
    }
}

#[allow(dead_code)]
pub fn main() {
    println!("Start p0239_brute_force testing...");
    println!(
        "{}",
        Solution::brute_force(vec![1, 3, -1, -3, 5, 3, 6, 7], 3) == vec![3, 3, 5, 5, 6, 7]
    );
    println!("{}", Solution::brute_force(vec![1], 1) == vec![1]);
    println!("{}", Solution::brute_force(vec![1, -1], 1) == vec![1, -1]);
    println!("{}", Solution::brute_force(vec![7, 2, 4], 2) == vec![7, 4]);

    println!("Start p0239_max_sliding_window testing...");
    println!(
        "{}",
        Solution::max_sliding_window(vec![1, 3, -1, -3, 5, 3, 6, 7], 3) == vec![3, 3, 5, 5, 6, 7]
    );
    println!("{}", Solution::max_sliding_window(vec![1], 1) == vec![1]);
    println!(
        "{}",
        Solution::max_sliding_window(vec![1, -1], 1) == vec![1, -1]
    );
    println!(
        "{}",
        Solution::max_sliding_window(vec![7, 2, 4], 2) == vec![7, 4]
    );
    println!("{}", Solution::max_sliding_window(vec![1], 10) == vec![1]);
    println!("{}", Solution::max_sliding_window(vec![], 10) == vec![]);
    println!("All Testing Passed ✅");
}
