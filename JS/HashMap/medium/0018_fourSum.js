// @ts-check

// 題目鏈結
// https://leetcode.com/problems/4sum/

// 題目說明
// Given an array nums of n integers,
// return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
//
// 0 <= a, b, c, d < n (位置不同)
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.
//
//
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
//
// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]
//

// 解題重點
// 了解 HashMap 基本概念與使用方式
// Divide and Conquer : 從中點開始分成兩段。

// 解題思路
// => (A + B) + (C + D)

// 複雜度
// Time Complexity : O(N^2)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  let mp = new Map();

  if (nums.length < 4) {
    return [];
  }

  let n = nums.length;

  // [0, 1, 2, 3, 4, 5, 6, 7];

  for (const a of nums) {
    mp.set(-a, (mp.get(-a) ?? 0) + 1);
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        if (mp.has(sum)) {
          mp.get(sum).push([i, j, k]);
        } else {
          mp.set(sum, [[i, j, k]]);
        }
      }
    }
  }
  console.log(mp);

  return [];
};

// 測試
(function () {
  console.log('Testing fourSum...');
  console.log(fourSum([1, 0, -1, 0, -2, 2], 0).length === 3);
  console.log(fourSum([2, 2, 2, 2, 2], 8).length === 1);
})();
