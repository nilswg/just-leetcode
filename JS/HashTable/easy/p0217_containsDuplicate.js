// @ts-check

// 題目鏈結
// https://leetcode.com/problems/contains-duplicate

// 題目說明
// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
//

// Example 1:
// Input: nums = [1,2,3,1]
// Output: true
//

// Example 2:
// Input: nums = [1,2,3,4]
// Output: false
//

// Example 3:
// Input: nums = [1,1,1,3,3,4,3,2,4,2]
// Output: true
//

// Constraints:
// 1 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9
//

// 解題重點
// 1.瞭解HashMap

// 解題思路
// 1.相當基礎的HashMap題型

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let mp = new Set();
  for (const num of nums) {
    if (mp.has(num)) return true;
    else mp.add(num);
  }
  return false;
};

// 測試
(function () {
  console.log('Testing [p0217_containsDuplicate]...');

  console.log(containsDuplicate([1, 2, 3, 1]) === true);
  console.log(containsDuplicate([1, 2, 3, 4]) === false);
  console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) === true);

  console.log('All Testing Passed ✅');
})();
