pub struct Solution {}

use std::collections::HashMap;
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut mp = HashMap::<i32, usize>::new();
        for (i, num) in nums.iter().enumerate() {
            let comp = target - num;
            // if let Some(&comp_idx) = mp.get(&comp) {
            //     return vec![comp_idx as i32, i as i32];
            // }
            // mp.insert(*num, i);
            match mp.get(&comp) {
                Some(&comp_idx) => {
                    return vec![comp_idx as i32, i as i32];
                }
                None => {
                    mp.insert(*num, i);
                }
            }
        }
        vec![]
    }
}
pub fn main() {
    println!("Start q0001_two_sum testing...");
    println!("case1:> {}", Solution::two_sum(vec![2, 7, 11, 15], 9) == vec![0, 1]);
    println!("case2:> {}", Solution::two_sum(vec![3, 2, 4], 6) == vec![1, 2]);
    println!("All Testing Passed ✅");
}
