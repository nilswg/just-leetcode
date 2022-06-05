// @ts-check

// 題目鏈結
// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array

// 題目說明
//
// Given an array of integers nums sorted in non-decreasing order,
// find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.

// Test Case:

// Input: [5, 7, 7, 8, 8, 10], target = 8;
// Output: [3, 4];
//
// Input: [5, 7, 7, 8, 8, 10], target = 6;
// Output: [-1, -1];
//
// Input: [], target = 0;
// Output: [-1, -1];
//
// Input: [1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 5, 5, 5, 6, 7, 8, 8, 8, 8], target = 8;
// Output: [15, 18];

// 解題重點
// (1) 針對已經排序過的陣列，Binary Search 是優先考慮的最佳做法
// (2) 考量找出左與右個別兩端位置，即分別實現兩次 Binary Search。
//     找出至左，nums[m] >= target { r = m-1 }
//     找出至右，nums[m] <= target { l = m+1 }
// (3) 第一次找出一側時，必得一位置，否則另一側必定也找不到，故可直接返回 [-1,-1];

// 暴力解:
// 先做一次 Binary Search 找出一點，再向左右兩端查找，此作法亦可找出答案；
// 但是，當如整個 Input 皆為 target 時，如 [8,8....8],
// 則 Worst case 時間複雜度仍為 O(N);

// 解題思路
// (略)

// 複雜度
// Time Complexity : O(logN)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let res = [-1, -1];
  let l, r;

  // binarySearchStart
  l = 0;
  r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] >= target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  // 優化重點，
  // 如果左側找到，則右側至少能找到相同位置，或是更靠右的位置。
  // 反之，則立刻返回 [-1, -1]。
  if (nums[l] !== target) {
    return res;
  }
  res[0] = l;

  // binarySearchEnd
  l = 0;
  r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] <= target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  res[1] = r;

  return res;
};

// 測試
(function () {
  const isValid = (a, b) => {
    return a[0] === b[0] && a[1] === b[1];
  };

  console.log('Testing [XXX]...');

  console.log(isValid(searchRange([5, 7, 7, 8, 8, 10], 8), [3, 4]));
  console.log(isValid(searchRange([5, 7, 7, 8, 8, 10], 6), [-1, -1]));
  console.log(isValid(searchRange([], 0), [-1, -1]));
  console.log(isValid(searchRange([1, 2, 3], 2), [1, 1]));
  console.log(isValid(searchRange([2, 2], 2), [0, 1]));
  console.log(isValid(searchRange([1], 1), [0, 0]));

  console.log('All Testing Passed ✅');
})();
