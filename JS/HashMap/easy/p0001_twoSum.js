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
// 3. 需關心答案的順序問題， [1,0] ❌；[0,1] ✅

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
    return nums1[0] === nums2[0] && nums1[1] === nums2[1];
  };

  console.log('Testing TwoSum...');
  console.log(isEqual(twoSum([2, 7, 11, 15], 9), [0, 1]));
  console.log(isEqual(twoSum([3, 2, 4], 6), [1, 2]));
  console.log(isEqual(twoSum([3, 3], 6), [0, 1]));
  console.log('All Testing Passed ✅');

})();
