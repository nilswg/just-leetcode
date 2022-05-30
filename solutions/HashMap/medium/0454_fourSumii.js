// @ts-check

// 題目鏈結
// https://leetcode.com/problems/4sum-ii/

// 題目說明
// Given four integer arrays nums1, nums2, nums3, and nums4 all of length n,
// return the number of tuples (i, j, k, l) such that:
//
// - 0 <= i, j, k, l < n
// - nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
//
// Input:
//  A = [ 1, 2]
//  B = [-2,-1]
//  C = [-1, 2]
//  D = [ 0, 2]
//
// Output: 2
//
// Explanation: The two tuples are:
// 1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

// 解題重點
// 了解 HashMap 基本概念與使用方式
// Divide and Conquer

// 解題思路
// => (A + B) + (C + D)

// 複雜度
// Time Complexity : O(N^2)
// Space Complexity: O(N)

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
 var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let mp = new Map();
  let count = 0;

  for (const a of nums1) {
    for (const b of nums2) {
      const sum = -(a + b);
      mp.set(sum, (mp.get(sum) ?? 0) + 1);
    }
  }

  for (const c of nums3) {
    for (const d of nums4) {
      count += mp.get(c + d) ?? 0;
    }
  }

  return count;
};

// 測試
(function () {
  console.log('Testing fourSumCount...');
  console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]) === 2);
})();
