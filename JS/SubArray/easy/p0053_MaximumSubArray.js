// @ts-check

// 題目鏈結
// https://leetcode.com/problems/maximum-subarray/

// 題目說明
// Given an integer array nums, find the contiguous subarray (containing at least one number)
// which has the largest sum and return its sum.
// A subarray is a contiguous part of an array.
//
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.

// 解題重點
// 1. 求出當前位置 i 所能達到的最大加總 (maximum acc)。
// 2. 再將此值 (maximum acc) 與當前 max 比較。

// 解題思路
// (略)

// 複雜度 (暴力解)
// Time Complexity : O(N^2)
// Space Complexity: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray_brute = function (nums) {
  let max = nums[0];
  let sum = nums[0];
  for (let i = 0, n = nums.length; i < n; i++) {
    sum = nums[i];
    max = Math.max(sum, max);
    for (let j = i + 1; j < n; j++) {
      sum += nums[j];
      max = Math.max(sum, max);
    }
  }
  return max;
};

// 複雜度 (遞迴，TopDown)
// Time Complexity : O(N)
// Space Complexity: O(N)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArrayTopDown = function (nums) {
  let max = -10000;
  const helper = (nums, i) => {
    if (i < 0) return -10000;
    let acc = Math.max(nums[i], nums[i] + helper(nums, i - 1));
    if (acc > max) {
      max = acc;
    }
    return acc;
  };
  helper(nums, nums.length - 1);
  return max;
};

// 複雜度 (遞迴，BottomUp 優化解)
// Time Complexity : O(N)
// Space Complexity: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let acc = -10000;
  let max = -10000;
  for (const num of nums) {
    // 求出當前位置 i 所能達到的最大加總 (maximum acc)。
    acc = Math.max(acc + num, num);

    // 再將此值 (maximum acc) 與當前 max 比較。
    max = Math.max(acc, max);
  }
  return max;
};

// 測試
(function () {
  console.log('Testing [maxSubArray_brute]...');
  console.log(maxSubArray_brute([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6);
  console.log(maxSubArray_brute([1]) === 1);
  console.log(maxSubArray_brute([1, 2]) === 3);
  console.log(maxSubArray_brute([-2, 1]) === 1);
  console.log(maxSubArray_brute([-1]) === -1);

  console.log('Testing [maxSubArrayTopDown]...');
  console.log(maxSubArrayTopDown([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6);
  console.log(maxSubArrayTopDown([1]) === 1);
  console.log(maxSubArrayTopDown([1, 2]) === 3);
  console.log(maxSubArrayTopDown([-2, 1]) === 1);
  console.log(maxSubArrayTopDown([-1]) === -1);

  console.log('Testing [maxSubArray]...');
  console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6);
  console.log(maxSubArray([1]) === 1);
  console.log(maxSubArray([1, 2]) === 3);
  console.log(maxSubArray([-2, 1]) === 1);
  console.log(maxSubArray([-1]) === -1);
  console.log('All Testing Passed ✅');
})();
