// @ts-check

// 題目鏈結
// https://leetcode.com/problems/sort-colors

// 題目說明
// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
// You must solve this problem without using the library's sort function.
//

// Example 1:
// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]
//

// Example 2:
// Input: nums = [2,0,1]
// Output: [0,1,2]
//

// Constraints:
// n == nums.length
// 1 <= n <= 300
// nums[i] is either 0, 1, or 2.
// Follow up: Could you come up with a one-pass algorithm using only constant extra space?
//

// 解題重點
// 1. 本題其實
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution :
 *
 * 1. 執行流程
 *
 *   // begin
 *   [1,2,2,2,2,0,0,0,1,1]
 *    i                 r
 *
 *   // 把2都換到最右邊，i的上限是r
 *   [1,1,1,0,0,0,2,2,2,2]
 *            i r
 *
 *   // 再把1都會到最右邊，i的上限一樣是r
 *   [0,0,0,1,1,1,2,2,2,2]
 *        r i
 *
 * 2. i <= r 相等
 *
 *  [1,2]
 *   i r
 *
 *  [1,2] // 換2，由於i,r相等也交換(原地交換)，r會前進下一格。
 *   r       (相當於我們在每次執行交換前，都會檢查r的起始位置)
 *
 *  對比以下，若 i,r相等沒有交換時:
 *
 *  [1,2] // 上一輪換2時, 若是 i,r相等時沒有交換，r不會前進。
 *   i r
 *
 *  [2,1] // 此次換1時, 交換後會得到錯誤的結果。
 *   ir
 *
 * 時間複雜度分析
 * 固定為 0, 1, 2 三種元素在序列中排序，由於每次都將一種元素排列到最右側。
 * 故要進行 2 次複雜度為 O(N) 的搜尋。所以是 O(N)
 *
 * 延伸思考: 假如有 m 種元素，且序列中有 n 個元素需要排序時，便需要 (m-1)*n 次的搜尋，為 O(mn)
 *
 * 複雜度
 * Time Complexity : O(n) // n 序列中的元素數量，又固定三種元素為, (3-1)*O(n) ≒ O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number[]} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const swap = (i, j) => {
    if (i === j) return;
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  const n = nums.length;
  let l = 0;
  let r = n - 1;

  for (let i = l; i < r; i++) {
    if (nums[i] === 2) {
      swap(i, r);
      r -= 1;
      i -= 1;
    }
  }
  for (let i = r; i > l; i--) {
    if (nums[i] === 0) {
      swap(i, l);
      l += 1;
      i += 1;
    }
  }

  return nums;
};

var sortColors2 = function (nums) {
  const swap = (i, j) => {
    if (i === r) return;
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  let r = nums.length - 1;

  // colors: [2, 1] ,0 不用
  for (let color = 2; color >= 1; color--) {
    for (let i = 0; i <= r; i++) {
      // 由於設置 i === r ，省略以下代碼。
      // while (r > 0 && nums[r] === color) {
      //   r -= 1;
      // }
      if (nums[i] === color) {
        swap(i, r);
        r -= 1;
        i -= 1;
      }
    }
  }

  return nums;
};

// 測試
(function () {
  console.log('Testing [p0075_sortColors]...');

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isEqual(cb([2, 0, 2, 1, 1, 0]), [0, 0, 1, 1, 2, 2]));
    console.log(isEqual(cb([2, 0, 1]), [0, 1, 2]));
    console.log(isEqual(cb([1, 0, 1]), [0, 1, 1]));
    console.log(isEqual(cb([0, 1, 0]), [0, 0, 1]));
    console.log(isEqual(cb([2, 1]), [1, 2]));
    console.log(isEqual(cb([1, 2]), [1, 2]));
    console.log(isEqual(cb([2, 2, 1]), [1, 2, 2]));
    console.log(
      isEqual(
        cb([1, 2, 2, 2, 2, 0, 0, 0, 1, 1]),
        [0, 0, 0, 1, 1, 1, 2, 2, 2, 2]
      )
    );
    console.log(isEqual(cb([2, 0, 2, 1, 1, 0]), [0, 0, 1, 1, 2, 2]));
    console.log(
      isEqual(cb([0, 2, 2, 2, 0, 2, 1, 1]), [0, 0, 1, 1, 2, 2, 2, 2])
    );
  };

  testingWith(sortColors);
  testingWith(sortColors2);

  console.log('All Testing Passed ✅');
})();
