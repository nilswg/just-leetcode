// p0003_length_of_longest_substring

pub struct Solution {}

use std::collections::HashMap;

impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        let mut mp = HashMap::<u8, i32>::new();
        let mut max = 0;
        let mut acc = 0;
        let mut lt = -1;

        for (i, byte) in s.as_bytes().iter().enumerate() {

            if let Some(&pos) = mp.get(byte){
                if pos > lt {
                    acc = i as i32 - pos;
                    lt = pos as i32;
                    mp.insert(*byte, i as i32);
                } else {
                    acc += 1;
                    max = max.max(acc);
                    mp.insert(*byte, i as i32);
                }
            }else {
                acc += 1;
                max = max.max(acc);
                mp.insert(*byte, i as i32);
            }
        }
        return max;
    }
}

#[allow(dead_code)]
pub fn main() {
    println!(
        "case1 : {}",
        Solution::length_of_longest_substring(String::from("abcd")) == 4
    );
    println!(
        "case2 : {}",
        Solution::length_of_longest_substring(String::from("abcabcbb")) == 3
    );
    println!(
        "case3 : {}",
        Solution::length_of_longest_substring(String::from("bbbbb")) == 1
    );
    println!(
        "case4 : {}",
        Solution::length_of_longest_substring(String::from("pwwkew")) == 3
    );
    println!(
        "case5 : {}",
        Solution::length_of_longest_substring(String::from("tmmzuxt")) == 5
    );
}
