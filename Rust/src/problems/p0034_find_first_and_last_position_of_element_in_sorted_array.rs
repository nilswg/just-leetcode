pub struct Solution {}
impl Solution {
    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let n = nums.len() as i32;
        let mut l = 0i32;
        let mut r = n - 1;

        while l <= r {
            let m = (l + r) / 2;
            if nums[m as usize] >= target {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        if l < 0 || l > (n - 1) || nums[l as usize] != target {
            return vec![-1, -1];
        }

        let mut res = vec![l, l];
        let mut l = 0i32;
        let mut r = n - 1;

        while l <= r {
            let m = (l + r) / 2;
            if nums[m as usize] <= target {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        res[1] = r;
        return res;
    }
}

// []
// 0
// [2,2]
// 3
#[allow(dead_code)]
pub fn main() {
    println!("Start p0034_find_first_and_last_position_of_element_in_sorted_array testing...");

    println!("{}", Solution::search_range(vec![], 0) == vec![-1, -1]);
    println!("{}", Solution::search_range(vec![2,2], 3) == vec![-1, -1]);
    println!("{}", Solution::search_range(vec![5,7,7,8,8,10], 6) == vec![-1, -1]);
    println!("{}", Solution::search_range(vec![5,7,7,8,8,10], 8) == vec![3, 4]);

    println!("All Testing Passed ✅");
}
