// @ts-check

// 題目鏈結
// https://leetcode.com/problems/climbing-stairs

// 題目說明
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
//

// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
//

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step
//

// Constraints:
// 1 <= n <= 45
//

// 解題重點
// 1.瞭解單純使用Recursive的暴力解分析解題思路。
// 2.瞭解動態規劃(Dynamic programming)。

// 解題思路
// 1.單純Recursive暴力解分析解題思路
// 2.改採用 DP 優化時間複雜度
// 3.BottomUp 優化空間複雜度

// Solution1 : 暴力解
//
// 沒有任何優化前，其決策樹結構接近二元樹，Time Complexity: O(2^N)
//
// 複雜度
// Time Complexity : O(2^N)
// Space Complexity: O(??)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairsBrute = function (n) {
  if (n < 1) return 0;

  let helper = (n) => {
    if (n < 2) return 1;
    return helper(n - 1) + helper(n - 2);
  };

  return helper(n);
};

// Solution2 : 使用 DP
//
// 將相同節點進行保存後，其決策樹結構為單臂的左子樹，其深度為 n，Time Complexity: O(N)
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairsDP = function (n) {
  if (n < 1) return 0;
  let dp = [];
  let helper = (n) => {
    if (n < 2) return 1;
    if (dp[n]) return dp[n];
    dp[n - 1] = helper(n - 1);
    dp[n - 2] = helper(n - 2);
    return dp[n - 1] + dp[n - 2];
  };

  return helper(n);
};

// Solution3 : 使用 BottomUp
//
// 採用 BottomUp 優化儲存空間， Space Complexity: O(1)。
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairsBottomUp = function (n) {
  if (n < 1) return 0;
  let a = 1; // f(1) = 1
  let b = 1; // f(0) = 1

  for (let i = 2; i <= n; i++) {
    let ta = a;
    a = a + b;
    b = ta;
  }

  return a;
};

// 測試
(function () {
  console.log('Testing [p0070_climbingStairs]...');

  const testingWith = (cb) => {
    console.log(cb(0) === 0);
    console.log(cb(1) === 1);
    console.log(cb(2) === 2);
    console.log(cb(3) === 3);
    console.log(cb(5) === 8);
    console.log(cb(8) === 34);
  };

  console.log('Testing [climbStairsBrute]...');
  testingWith(climbStairsBrute);

  console.log('Testing [climbStairsDP]...');
  testingWith(climbStairsDP);

  console.log('Testing [climbStairsBottomUp]...');
  testingWith(climbStairsBottomUp);

  console.log('All Testing Passed ✅');
})();
