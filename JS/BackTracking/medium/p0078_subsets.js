// @ts-check

import { isArrayEqual } from '../backTracking.js';

// 題目鏈結
// https://leetcode.com/problems/subsets

// 題目說明
// Given an integer array nums of unique elements, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.
//

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
//

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]
//

// Constraints:
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// All the numbers of nums are unique. ✨
//

// 解題重點
// 1. 瞭解並使用 BackTracking 來實作此題
// 2. 本題有說 All the numbers of nums are unique.

// 解題思路
// 1. 每次添入一個新元素num時，都是前一次 sums 中所有sum的添入num形成的新子集，再將新子集放入sums中
// 2. 每次添入一個新元素時，sums的長度都會倍增。故時間與空間複雜度均是 O(2ⁿ)。 n = nums.length
// 3. 須考慮空集合，初始化 sums = [[]]。

/**
 * Solution : 使用雙層迴圈實作
 * 
 * 時間複雜度分析
 * 總共形成 2ⁿ 個子集合，其中，子集合中最大長度為 n。 所以共有 n*2ⁿ
 * 故總元素的計算為: ( (1+n)*(2ⁿ) / 2) ≓ O(n*2ⁿ)/2 ≓ O(n2ⁿ)
 * 
 * 空間複雜度分析
 * res 的最終長度為 2ⁿ 個子集合，子集合中最大長度為 n。 但此處僅考慮 n 的大小，故時間複雜度為 O(n)
 *
 * 複雜度
 * Time Complexity : O(n2ⁿ) // sums中的總元素
 * Space Complexity: O(n)   // 僅考慮計算中出現的最大子集合長度，即 n
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsBrute = function (nums) {
  let sums = [[]];

  for (let i = 0, m = nums.length; i < m; i++) {
    const num = nums[i];
    for (let j = 0, n = sums.length; j < n; j++) {
      const preSums = sums[j];
      sums.push([...preSums, num]);
    }
  }

  return sums;
};

/**
 * Solution: 使用 BackTracking
 * 
 * 時間與空間複雜度分析同上(subsetsBrute)。
 * 
 * 複雜度
 * Time Complexity : O(n2ⁿ) // res 中的總元素
 * Space Complexity: O(n)   // 僅考慮計算中出現的最大子集合長度，即 n
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsBackTracking = function (nums) {
  if (nums.length === 1) return [[], [nums[0]]];

  const n = nums.length;
  const res = [];

  // nums.sort(); // 避免重覆所以先排序
  const dfs = (st, subset) => {
    res.push([...subset]);
    for (let i = st; i < n; i++) {
      // if (i > 0 && nums[i] === nums[i-1]) continue; // 避免重覆
      
      subset.push(nums[i]);
      dfs(i + 1, subset);
      subset.pop();
    }
  };

  dfs(0, []);
  return res;
};

// 測試
(function () {
  console.log('Testing [p0078_subsets]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);

    console.log(
      isArrayEqual(cb([1, 2, 3]), [
        [],
        [1],
        [2],
        [1, 2],
        [3],
        [1, 3],
        [2, 3],
        [1, 2, 3],
      ])
    );
    console.log(isArrayEqual(cb([0]), [[], [0]]));
  };

  testingWith(subsetsBrute);
  testingWith(subsetsBackTracking);

  console.log('All Testing Passed ✅');
})();
