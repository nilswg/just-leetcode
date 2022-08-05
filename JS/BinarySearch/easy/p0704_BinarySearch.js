// @ts-check

// 題目鏈結
// https://leetcode.com/problems/binary-search/

// 題目說明
// Given an array of integers nums which is sorted in ascending order,
// and an integer target, write a function to search target in nums.
// If target exists, then return its index. Otherwise, return -1.
//
// You must write an algorithm with O(log n) runtime complexity.

// 解題重點
// 了解BinarySearch的方法與特性。

// 解題思路
// 題目提示有序的序列時，直覺反應要猜測是BinarySearch來加速。

// 複雜度
// Time Complexity : O(logN)
// Space Complexity: O(1)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    else if (nums[m] > target) r = m - 1;
    else l = m + 1;
  }
  return -1;
};

// 測試
(function () {
  console.log('Testing [p0704_BinarySearch]...');

  console.log(search([-1, 0, 3, 5, 9, 12], 9) === 4);
  console.log(search([-1, 0, 3, 5, 9, 12], 2) === -1);

  console.log('All Testing Passed ✅');
})();
