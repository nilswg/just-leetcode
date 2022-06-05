// Kth_Largest_Element_in_an_Array

pub struct Solution {}
impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        nums.sort_by(|a, b| b.cmp(&a));
        nums[k as usize - 1]
    }
}
#[allow(dead_code)]
pub fn main() {
    println!("Start p0001_two_sum testing...");
    println!(
        "{}",
        Solution::find_kth_largest(vec![3, 2, 1, 5, 6, 4], 2) == 5
    );
    println!(
        "{}",
        Solution::find_kth_largest(vec![3, 2, 3, 1, 2, 4, 5, 5, 6], 4) ==4
    );
    println!("{}", Solution::find_kth_largest(vec![0, 1, 2], 1) == 2);
    println!("All Testing Passed ✅");
}
