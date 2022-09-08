// @ts-check

import { isArrayEqual } from '../backTracking.js';

// 題目鏈結
// https://leetcode.com/problems/combination-sum

// 題目說明
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
// It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
//

// Example 1:
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
//

// Example 2:
// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
//

// Example 3:
// Input: candidates = [2], target = 1
// Output: []
//

// Constraints:
// 1 <= candidates.length <= 30
// 1 <= candidates[i] <= 200
// All elements of candidates are distinct.
// 1 <= target <= 500
//

// 解題重點
// 1. 瞭解 BackTracking，並窮舉並找出所有滿足條件的組合。

// 解題思路
// 1. 可以跟 p0322 找零錢做個比較
// 2. 旨在窮舉所有組合所以不能用狀態移轉的方式來優化時間複雜度。

/**
 * Solution : BackTracking
 *
 *           7
 *        / / \ \
 *       5 4  1 0
 *      /
 *     3
 *    /\
 *   1  0//儲存
 *  /   
 * -1//撤回
 *
 * 1.考量到 n 與新加入元素 cand 的狀態:
 *   (1) n - cand < 0 代表該組合無效，立即返回
 *   (2) n - cand === 0 代表找到有效的組合，將組合放入 res 中。
 * 2.組合的元素雖然可以反覆使用，但是組合必須唯一，如: [2,3,2] 與 [2,2,3] 視作相同組合
 *   可使用新加入的元素需大於組合中的最後元素(cand > comb[comb.length-1] )，以此去除重複
 *
 * 時間複雜度分析
 * 共有 n 個空間要放入元素，共有 K 個元素可供選擇，每個元素可被重覆使用，則有 Kⁿ
 *
 * 空間複雜度分析
 * 即 dfs 的走訪深度，最糟狀況需要放入 n 個元素，所以 stack 的空間複雜度為 O(n)
 *
 * 複雜度
 * Time Complexity : O(Kⁿ) // K 個元素可供選擇；需要 n 個元素
 * Space Complexity: O(n)  // 需要放入 n 個元素
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSumBrute = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  let res = [];
  let dfs = (n, comb = []) => {
    for (const cand of candidates) {
      if (cand < comb[comb.length - 1]) continue; //跳過開頭較小的數值，去除重覆
      if (n - cand < 0) return;
      if (n - cand === 0) {
        res.push([...comb, cand]);
        return;
      }
      comb.push(cand);
      dfs(n - cand, comb);
      comb.pop();
    }
  };
  dfs(target, []);
  return res;
};

// 測試
(function () {
  console.log('Testing [p0039_combinationSum]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isArrayEqual(cb([2, 3, 6, 7], 7), [[2, 2, 3], [7]]));
    console.log(
      isArrayEqual(cb([2, 3, 5], 8), [
        [2, 2, 2, 2],
        [2, 3, 3],
        [3, 5],
      ])
    );
    console.log(isArrayEqual(cb([2], 1), []));
    console.log(
      isArrayEqual(cb([2, 7, 6, 3, 5, 1], 9), [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 2, 2],
        [1, 1, 1, 1, 2, 3],
        [1, 1, 1, 1, 5],
        [1, 1, 1, 2, 2, 2],
        [1, 1, 1, 3, 3],
        [1, 1, 1, 6],
        [1, 1, 2, 2, 3],
        [1, 1, 2, 5],
        [1, 1, 7],
        [1, 2, 2, 2, 2],
        [1, 2, 3, 3],
        [1, 2, 6],
        [1, 3, 5],
        [2, 2, 2, 3],
        [2, 2, 5],
        [2, 7],
        [3, 3, 3],
        [3, 6],
      ])
    );
  };

  testingWith(combinationSumBrute);

  console.log('All Testing Passed ✅');
})();
