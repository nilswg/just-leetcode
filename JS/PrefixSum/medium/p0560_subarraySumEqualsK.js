
// @ts-check

// 題目鏈結
// https://leetcode.com/problems/subarray-sum-equals-k

// 題目說明
// Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.
// 

// Example 1:
// Input: nums = [1,1,1], k = 2
// Output: 2
// 

// Example 2:
// Input: nums = [1,2,3], k = 3
// Output: 2
// 

// Constraints:
// 1 <= nums.length <= 2 * 10⁴
// -1000 <= nums[i] <= 1000
// -10⁷ <= k <= 10⁷
// 

// 解題重點
// 1. 瞭解 PrefixSum(前綴和)

// 解題思路
// 1.先考慮窮舉方式實作暴力解
// 2.使用PrefixSum，透過額外的記憶空間，去優化重覆出現的計算。類似動態規劃概念。

/**
 * Solution : 窮舉所有組合
 *
 * 複雜度
 * Time Complexity : O(N^3)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var subarraySumBrute = function (nums, k) {
  let n = nums.length;
  let res = 0;
  let sum = 0;
  for (let l = 0; l < n; l++) {
    for (let r = l; r < n; r++) {
      sum = 0;
      for (let i = l; i <= r; i++) {
        sum += nums[i];
      }
      if (sum === k) {
        res += 1;
      }
    }
  }
  return res;
};

/**
 * Solution : 使用 PrefixSum
 *
 * 前綴合 (PrefixSum)
 * 1)  prefixSum[n] = nums[0] + ... + nums[n] ;*
 *
 * 2)  nums[n] = prefixSum[n] - ( nums[0] + ... + nums[n-1] );
 *     nums[n] = prefixSum[n] - prefixSum[n-1]*
 *
 * 3)  nums[0] + ... + nums[j] + ... + nums[n]  = prefixSum[n];
 *     prefixSum[j]  + ... + nums[n] = prefixSum[n];
 *     nums[j+1] + ... + nums[n] = prefixSum[n] - prefixSum[j]
 *     nums[j+1] + ... + nums[n] == k; (<<< 題目希望，數列中，開始j+1 到結束 n，其連續的元素其總合為K)
 *
 * 4)  找出 prefixSum[n] - prefixSum[j] == k;  (實作目標)
 *     Input [1,1,1,2] , target :2,
 *     滿足的組合, [0,1]、[1,2]、[3] 共3個。
 *
 * 使用 PrefixSum 時，初始化時將出現 0 的次數設置為 1，考慮首次 sum === k 的狀況。
 * 無論是否有符合的，均要記錄下當前 sum 的出現次數。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySumPrefixSum = function (nums, k) {
  const mp = new Map();
  mp.set(0, 1); // 考慮首次 sum === k 的狀況
  let sum = 0;
  let res = 0;
  for (const num of nums) {
    sum += num;
    const prevSum = mp.get(sum - k);
    if (prevSum !== undefined) {
      res += prevSum;
    }
    mp.set(sum, (mp.get(sum) ?? 0) + 1);
  }
  return res;
};

// 測試
(function () {
  console.log("Testing [p0560_subarraySumEqualsK]...");

  const testingWith = (cb) => {
    console.log(`Testing [${cb.name}]`);
    console.log(cb([1, 1, 1], 2) === 2);
    console.log(cb([1, 2, 3], 3) === 2);
    console.log(cb([1, 2, 1, 2, 1], 3) === 4);
    console.log(cb([1, -1, 0], 0) === 3);
  };

  testingWith(subarraySumBrute);
  testingWith(subarraySumPrefixSum);

  console.log("All Testing Passed ✅");
})();
