// @ts-check

// 題目鏈結
// https://leetcode.com/problems/contains-duplicate-ii

// 題目說明
// Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
//

// Example 1:
// Input: nums = [1,2,3,1], k = 3
// Output: true
//

// Example 2:
// Input: nums = [1,0,1,1], k = 1
// Output: true
//

// Example 3:
// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false
//

// Constraints:
// 1 <= nums.length <= 10^5
// -10^9 <= nums[i] <= 10^9
// 0 <= k <= 10^5
//

// 解題重點
// 1.瞭解HashMap
// 2.p0217的延伸

// 解題思路
// 1.使用HashMap邊寫邊查找，當查找到尚未存在的項目時，則記錄起當前位置
// 2.當查找到紀錄時，則檢查其位址是否滿足題目條件: currPos - lastPos <= k
//   (1) 若滿足則返回 true
//   (2) 若不滿足，"則也要更新這一次的位址"，因為其先前一次的紀錄一定下次也不會滿足條件。
//

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicateii = function (nums, k) {
  let mp = new Map();
  for (let i = 0, n = nums.length; i < n; i++) {
    const num = nums[i];
    if (mp.has(num) && i - mp.get(num) <= k) {
      return true;
    } else mp.set(num, i);
  }
  return false;
};

// 測試
(function () {
  console.log('Testing [p0219_containsDuplicateIi]...');

  console.log(containsNearbyDuplicateii([1, 2, 3, 1], 3) === true);
  console.log(containsNearbyDuplicateii([1, 0, 1, 1], 1) === true);
  console.log(containsNearbyDuplicateii([1, 2, 3, 1, 2, 3], 2) === false);

  console.log('All Testing Passed ✅');
})();
