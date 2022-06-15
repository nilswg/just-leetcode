pub struct Solution {}

use std::cmp;

impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        let mut max = nums[0];
        let mut acc = nums[0];

        for i in 1..nums.len() {
            acc = cmp::max(acc + nums[i], nums[i]);
            max = cmp::max(acc, max);
        }

        max
    }
}

#[allow(dead_code)]
pub fn main() {
    println!("Start p0053_maximum_subarray testing...");
    println!(
        "{}",
        Solution::max_sub_array(vec![-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6
    );
    println!("{}", Solution::max_sub_array(vec![1]) == 1);
    println!("{}", Solution::max_sub_array(vec![1, 2]) == 3);
    println!("{}", Solution::max_sub_array(vec![-2, 1]) == 1);
    println!("{}", Solution::max_sub_array(vec![-1]) == -1);
    println!("All Testing Passed ✅");
}
