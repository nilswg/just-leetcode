// @ts-check

// 題目鏈結
// https://leetcode.com/problems/two-sum

// 題目說明
// 1. Two Sum
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Output: Because nums[0] + nums[1] == 9, we return [0, 1].

// 解題重點
// 1. 了解 HashMap 基本概念與使用方式
// 2. HashMap儲存以值來找index，即 { key:value, value:index }

// 解題思路
// (略)

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const mp = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (mp.has(nums[i])) {
      return [mp.get(nums[i]), i];
    } else {
      mp.set(target - nums[i], i);
    }
  }
  return null;
};

// 測試
(function () {
  let isEqual = (nums1, nums2) => {
    // 驗證長度是否一致
    if (nums1.length !== nums2.length) return false;

    // 確保兩者順序一致。
    nums1.sort();
    nums2.sort();

    // 比較內容是否完全一致。
    for (let i = 0; i < nums1.length; i++) {
      if (nums1[i] !== nums2[i]) {
        return false;
      }
    }
    return true;
  };

  console.log('Testing TwoSum...');
  console.log(isEqual(twoSum([2, 7, 11, 15], 9), [0, 1]));
  console.log(isEqual(twoSum([3, 2, 4], 6), [1, 2]));
  console.log(isEqual(twoSum([3, 3], 6), [0, 1]));
  console.log('All Testing Passed ✅');

})();
