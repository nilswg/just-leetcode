// @ts-check

// 題目鏈結
// https://leetcode.com/problems/majority-element

// 題目說明
// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times.
// You may assume that the majority element always exists in the array.
//

// Example 1:
// Input: nums = [3,2,3]
// Output: 3
//

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2
//

// Constraints:
// n == nums.length
// 1 <= n <= 5 * 10^4
// -2^31 <= nums[i] <= 2^31 - 1
//

// Follow-up: Could you solve the problem in linear time and in O(1) space?

// 解題重點
// 1. 瞭解 HashTable 的使用
// 2. 此題定義的眾數 (majority-element) 非指出現最多的數，而是超過"總數一半以上的數" (N/2)。
// 3. 瞭解摩爾投票法(Boyer–Moore majority vote algorithm)的應用: 若想找出前 k 名最多得票的候選人，
//    假設總共有N個投票者，則必定當選的得票數需至少超過 "N/k+1"
//    e.g : 若取1名，則需 > N/2 (取得總得票數的一半以上的票數)

// 解題思路
// 1. 應能先透過HashTable思考出暴力解，空間複雜度 O(N)。
// 2. 再透過 摩爾投票法 將空間複雜度 優化成O(1)

// Solution : HashTable 暴力解
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElementBrute = function (nums) {
  let half = nums.length / 2;
  let mp = {};
  for (const num of nums) {
    mp[num] = (mp[num] ?? 0) + 1;
    if (mp[num] > half) return num; // 根據題目定義，必有一解
  }
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let res = 0;
  let cnt = 0;
  for (const num of nums) {
    if (cnt > 0 && num === res) {
      cnt += 1;
    } else if (cnt === 0) {
      cnt = 1;
      res = num;
    } else {
      cnt -= 1;
    }
  }
  return res;
};

// 測試
(function () {
  console.log('Testing [p0169_majorityElement]...');

  console.log(majorityElementBrute([3, 2, 3]) === 3);
  console.log(majorityElementBrute([2, 2, 1, 1, 1, 2, 2]) === 2);
  console.log(majorityElement([3, 2, 3]) === 3);
  console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2);

  console.log('All Testing Passed ✅');
})();
