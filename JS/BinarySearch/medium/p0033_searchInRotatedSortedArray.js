// @ts-check

// 題目鏈結
// https://leetcode.com/problems/search-in-rotated-sorted-array

// 題目說明
// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// You must write an algorithm with O(log n) runtime complexity.
//

// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
//

// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
//

// Example 3:
// Input: nums = [1], target = 0
// Output: -1
//

// Constraints:
// 1 <= nums.length <= 5000
// -10⁴ <= nums[i] <= 10⁴
// All values of nums are unique.
// nums is an ascending array that is possibly rotated.
// -10⁴ <= target <= 10⁴
//

// 解題重點
// 1. 瞭解二分搜尋法
// 2. 靈活運用二分搜尋法，處理本題因旋轉，導致部分序列為無序

// 解題思路
// 1. 本題因旋轉，導致部分序列為無序情形，僅考量有序部分來判斷。

/**
 * Solution : 二分搜尋法
 * 
 * 1.透過觀察，可以發現，任一序列取中點後，分為成左右兩側序列，必為以下幾種情形:
 *   (1) 兩段皆有序，中點為序列中最大值或最小值時，或該序列沒有發生旋轉
 *   (2) 其一段無序，另一段有序
 *   (3) 承(2)有序無序的判斷，還要根據數量，若若序列數量僅剩2或1時，左側數量0；右側數量0或1，結束迴圈
 *
 *    e.g   1,2,[3],4,5   沒有發生旋轉，左右皆有序
 *          2,3,[4],5,1   左有序、右無序
 *          3,4,[5],1,2   5 序列中最大，左右皆有序
 *          4,5,[1],2,3   1 序列中最小，左右皆有序
 *          5,1,[2],3,4   左無序、右有序
 *
 *    e.g   1,[2],3,4     沒有發生旋轉，左右皆有序
 *          4,[1],2,3     1 序列中最小，左右皆有序
 *          3,[4],1,2     4 序列中最大，左右皆有序
 *          2,[3],4,1     左有序、右無序
 *
 *    e.g   1,[2],3       左側有序，右側僅為1數量不足。
 *          3,[1],2       左側有序，右側僅為1數量不足。
 *          2,[3],1       左側有序，右側僅為1數量不足。
 *
 *    e.g   [2],3         左、右側元素數量均不足。
 *          [3],2         左、右側元素數量均不足。
 *
 *
 *     結論，我們可以確定每次至少一側是有序的，所以實作上，每次都只檢查有序的那一側，
 *     若 target 界在其中則繼續搜尋該側；反之，target 必在另一側中。
 *
 * 2. 最終搜尋的區間會不斷縮小至其中一側沒有元素，或僅剩下 1 個元素時，情況為 :
 *
 *     e.g : 3,[1],2 , nums[m] = 1，搜尋0，左側尚有元素3、有序，但檢查左側發現不合，繼續檢查右側，右側僅有1，1不是答案，返回-1。
 *
 *     e.g : [3],1   , nums[m] = 3, 搜尋1，左側無元素、無序，右側僅有1，1 是答案，返回1。
 *
 *     e.g : [1],2   , nums[m] = 1，搜尋0，左側無元素、無序，右側僅有2，2 非答案，返回-1。
 *
 *     兩側數量皆不足時(區間長度<=2)，結束迴圈，判斷nums[l]或nums[r]任一等於target；
 *     皆不是，表示序列無法找到，即返回 -1
 * 
 * 
 * 複雜度
 * Time Complexity : O(logN)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    // 數量必定 >= 2，故 r-l > 0
    let m = Math.floor((l + r) / 2);
    if (nums[m] === target) {
      return m;
    } else if (nums[l] < nums[m]) {
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else if (nums[r] > nums[m]) {
      if (nums[r] >= target && target > nums[m]) l = m + 1;
      else r = m - 1;
    } else {
      break; //表示左右側數量皆不夠。
    }
  }
  // 該區段剩餘元素數量為1或2。
  if (nums[l] === target) {
    return l;
  } else if (nums[r] === target) {
    return r;
  } else {
    return -1; // 皆不是則找不到
  }
};

// 測試
(function () {
  console.log('Testing [p0033_searchInRotatedSortedArray]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb([4, 5, 6, 7, 0, 1, 2], 0) === 4);
    console.log(cb([4, 5, 6, 7, 0, 1, 2], 3) === -1);
    console.log(cb([1], 0) === -1);
    console.log(cb([6, 7, 1, 2, 3, 4, 5], 6) === 0);
    console.log(cb([1, 3], 3) === 1);
    console.log(cb([3, 4, 5, 6, 7, 8, 1, 2], 2) === 7);
    console.log(cb([1, 3], 0) === -1);
    console.log(cb([4, 5, 6, 7, 0, 1, 2], 4) === 0);
    console.log(cb([4, 5, 6, 7, 0, 1, 2], 6) === 2);
    console.log(cb([3, 1], 1) === 1);
  };

  testingWith(search);

  console.log('All Testing Passed ✅');
})();
