// @ts-check

// 題目鏈結
// https://leetcode.com/problems/product-of-array-except-self

// 題目說明
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(n) time and without using the division operation.
//

// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
//

// Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]
//

// Constraints:
// 2 <= nums.length <= 10⁵
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
//

// 解題重點
// 1.思考暴力解
// 2.本題要求不可以使用"除法"，需使用PrefixSum的概念去實作符合題旨的解法

// 解題思路
// 1.思考暴力解，探求邊界問題。
// 2.使用PrefixSum的概念，在僅使用乘法下來時做解答。
// 3.承2, 優化其空間複雜度為O(1)。

/**
 * Solution : 暴力解，但不合乎題目要求。
 *
 * 一般而言，我們非常容易可以想出這樣的解法，然而，本題要求不可以使用"除法"。
 * 故以下的方法不合題目的要求。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelfBrute = function (nums) {
  let zero = 0;
  let tmp = 1;
  for (const num of nums) {
    if (num === 0) {
      zero += 1;
      if (zero > 1) break;
    } else tmp *= num;
  }

  if (zero > 1) {
    return nums.map((x) => 0);
  } else if (zero === 1) {
    return nums.map((x) => (x !== 0 ? 0 : tmp));
  } else {
    return nums.map((x) => tmp / x);
  }
};

/**
 * Solution : 使用 PrefixSum
 *
 * 1. 因應本題的特殊要求，最佳是考慮使用 PrefixSum 的概念來實作，
 *    其實作方法上，是透過原序列，由不同方向，拆分成"從頭至尾"與"從尾至頭"的左右兩序列，
 *    並分別紀錄其乘積，最後再將兩序列的乘積加進行乘積便是答案。
 *
 *    原序列： [ 1        2       3        4 ]
 *    左部分：   1       ,1      ,1*2    ,1*2*3
 *    右部分：   2*3*4   ,3*4    ,4      ,1
 *    -------------------------------------------------------
 *    结果：    1*2*3*4   1*3*4   1*2*4   1*2*3*1
 *
 * 2. 題目要求以額外的 answer 儲存結果，作為答案返回。answer長度不列入空間複雜度。
 *
 * 3. 左部分乘積序列 L[i] : 為不包含nums[i], 即 nums[0]..nums[i-1] 的總乘積
 *    右部分乘積序列 R[i] : 為不包含nums[i], 即 nums[i+1]..nums[n-1] 的總乘積
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(2N) (R+L ,answer可不被計入)
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelfPrefixSum = function (nums) {
  const n = nums.length;
  const L = [];
  const R = [];
  const answer = [];

  // 左半邊，初始化第L[0]為1，從第 1 項開始
  L[0] = 1;
  for (let i = 1; i < n; i++) {
    L[i] = L[i - 1] * nums[i - 1];
  }

  // 右半邊，初始化R[n-1]為1，從第 n-2 開始
  R[n - 1] = 1;
  for (let j = n - 2; j > -1; j--) {
    R[j] = R[j + 1] * nums[j + 1];
  }

  // 左右序例再乘積即為答案。
  for (let i = 0; i < n; i++) {
    answer[i] = L[i] * R[i];
  }

  return answer;
};

/**
 * Solution : 使用 PrefixSum , 空間壓縮
 * 
 * 1. 根據題目，answer空間需求可不被列入計算，直接使用其儲存左半部乘積。
 * 2. 右半部的乘積序列，由後至前，其R[i]僅依其前一項R[i+1]，故計算總乘積時，使用Rp來保存前一項即可。
 * 3. 最後總乘績排除自身: (1) answer[j] = answer[j] * Rp;
 *                      (2) Rp *= nums[j]; (更新其值，繼續作為下一次計算的右部分乘積)  
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1) (answer可不被計入)
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelfPrefixSumOptional = function (nums) {
  const n = nums.length;
  const answer = [1]; // 第0項為1

  // 改用 answer 取代 L
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
  }

  // 再右 Rp 動態儲存右半邊乘積。j 為當前項，且不依賴前一項 j+1。 
  let Rp = 1;
  for (let j = n - 1; j > -1; j--) {
    answer[j] = answer[j] * Rp; // 相當於 左 x 右
    Rp *= nums[j];          // Rp 由尾至頭，繼續乘積
  }

  return answer;
};

// 測試
(function () {
  console.log("Testing [p0238_productOfArrayExceptSelf]...");

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isEqual(cb([1, 2, 3, 4]), [24, 12, 8, 6]));
    console.log(isEqual(cb([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]));
  };

  testingWith(productExceptSelfBrute);
  testingWith(productExceptSelfPrefixSum);
  testingWith(productExceptSelfPrefixSumOptional);

  /**
   * Write Some Testing here
   */

  console.log("All Testing Passed ✅");
})();
