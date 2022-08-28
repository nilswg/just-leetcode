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

/**
 * Solution1 : 暴力解
 *
 *                f(4)
 *             /         \
 *          /               \
 *        f(3)             f(2)
 *       /    \          /     \
 *    f(2)    f(1)     f(1)    f(0)
 *    /  \    /  \     /  \    /  \
 *  f(1)f(0) ∅    ∅   ∅   ∅   ∅   ∅
 *
 * 其中， f(1)、f(0) 就返回 1，但是為了方便分析，使用 ∅ 表示空節點
 * 無DP優化前，遞迴樹結構接近二元樹，時間複雜度就是其樹的節點總數量2^N-1
 * 即Time Complexity: O(2^N)。
 *
 * 複雜度
 * Time Complexity : O(2^N)
 * Space Complexity: O(N) ； N 即遞迴樹的高度
 *
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

/**
 * Solution2 : 使用 DP Top-Down
 *
 * DP : [1, 1, 2, 3, 5]
 *
 *                dp[5]
 *              /       \
 *            dp[4]     dp[3](可重用)
 *          /      \
 *        dp[3]    dp[2](可重用)
 *       /   \
 *    dp[2]  dp[1](可重用)
 *    /   \
 *  dp[1]  dp[0]
 *
 * 將相同節點進行保存後，其遞迴樹結構為單臂的左子樹，其深度為 N，Time Complexity: O(N)
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N) ； N 即遞迴樹的高度
 *
 * @param {number} n
 * @return {number}
 *
 */
var climbStairsDP = function (n) {
  if (n < 1) return 0;
  let dp = [1, 1]; //if (n < 2) return 1;

  let helper = (n) => {
    if (dp[n]) return dp[n];
    dp[n] = helper(n - 1) + helper(n - 2);
    return dp[n];
  };

  return helper(n);
};

/**
 * Solution3 : 使用 BottomUp
 *
 * f(0) + f(1) -> f(2) -> f(3) -> f(4) -> f(5)
 *
 *         ta    a      b
 *               1(n=1) 1(n=0)
 * n=2      1    2      1
 * n=3      2    3      2
 * n=4      3    5      3
 * n=5      5    8      5
 *
 * 採用 BottomUp 優化儲存空間， Space Complexity: O(1)。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
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
  console.log("Testing [p0070_climbingStairs]...");

  const testingWith = (cb) => {
    console.log(cb(0) === 0);
    console.log(cb(1) === 1);
    console.log(cb(2) === 2);
    console.log(cb(3) === 3);
    console.log(cb(5) === 8);
    console.log(cb(8) === 34);
  };

  console.log("Testing [climbStairsBrute]...");
  testingWith(climbStairsBrute);

  console.log("Testing [climbStairsDP]...");
  testingWith(climbStairsDP);

  console.log("Testing [climbStairsBottomUp]...");
  testingWith(climbStairsBottomUp);

  console.log("All Testing Passed ✅");
})();
