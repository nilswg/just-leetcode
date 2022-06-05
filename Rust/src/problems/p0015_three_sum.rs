pub struct Solution {}

impl Solution {
    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut nums = nums;
        let mut res = vec![];
        nums.sort();

        let mut use_two_pointers = |i: usize, mut l: usize, mut r: usize| {
            while l < r {
                // println!("l: {}, r: {}", l, r);
                let sum = nums[i] + nums[l] + nums[r];
                // println!("sum: {}", sum);
                if sum < 0 {
                    l += 1;
                } else if sum > 0 {
                    r -= 1;
                } else {
                    res.push(vec![nums[i], nums[l], nums[r]]);
                    // println!("{:?}", res);
                    l += 1;
                    while l < r && nums[l] == nums[l - 1] {
                        l += 1;
                    }
                }
            }
        };

        for i in 0..nums.len() {
            if nums[i] > 0 {
                break;
            };
            if i > 0 && nums[i] == nums[i - 1] {
                continue;
            }
            // useTwoPointer
            let l = i + 1;
            let r = nums.len() - 1;
            use_two_pointers(i, l, r);
        }
        res
    }
}

#[allow(dead_code)]
pub fn main() {
    Solution::three_sum(vec![1, 2, 3]);
}
