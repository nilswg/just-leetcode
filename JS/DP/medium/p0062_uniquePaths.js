// @ts-check

// 題目鏈結
// https://leetcode.com/problems/unique-paths

// 題目說明
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
// The test cases are generated so that the answer will be less than or equal to 2 * 10⁹.
//

// Example 1:
// Input: m = 3, n = 7
// Output: 28
//

// Example 2:
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down
//

// Constraints:
// 1 <= m, n <= 100
//

// 解題重點
// 1. 屬於動態規劃的基本題型。
// 2. 瞭解組合數學公式 Combination

// 解題思路
// 1. 從左上到左下，通過二維dp陣列去存儲結果。O(mn)
// 2. 承1，優化空間複雜度為一維 O(n)
// 3. 使用 Combination 公式去求解

/**
 * Solution : 二維DP
 *
 * e.g :
 *
 *    1,1,1,1,1,1,1,
 *    1,2,3,4,5,6,7,
 *    1,3,6,10,15,21,28,
 *
 * 複雜度
 * Time Complexity : O(mn)
 * Space Complexity: O(mn)
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsDpSquaredSpace = function (m, n) {
  let dp = new Array(m).fill(0).map((x) => new Array(n).fill(1));
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
};

/**
 * Solution : 一維DP
 *
 * 複雜度
 * Time Complexity : O(mn)
 * Space Complexity: O(n)
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsDpLinearSpace = function (m, n) {
  let dp = new Array(m).fill(0).map((x) => new Array(n).fill(1));
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
};

/**
 * Solution : 使用數學公式 (這個算是補充)
 *
 * 從左上到右下的過程中，需要移動 (m+n-2) 次，其中 (m-1) 次下降；(n-1) 次向右
 * 因此路徑的總數為，m+n-2 次中，選 m-1 次向下移動的方案數，即組合數:
 *
 * => (i+j)!/(i)!*(j)!
 *
 *
 * e.g     m = 3, n =7
 *         => (m+n-2)! / (m-1)! * (n-1)!
 *         => 8! / 2! * 6!
 *         => 7*8 / 1*2
 *         => 7/1 * 8/2 = 28  (i, [n..n+(m-1)]) 且 (j, [1..m-1])
 *
 * 複雜度
 * Time Complexity : O(mn)
 * Space Complexity: O(n)
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsMathematics = function (m, n) {
  let ans = 1;
  for (let i = n, j = 1; j < m; i++, j++) {
    // console.log(i, j);
    ans = Math.floor((ans * i) / j);
  }
  // console.log('ans', ans);
  return ans;
};

// 測試
(function () {
  console.log('Testing [p0062_uniquePaths]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb(3, 7) === 28);
    console.log(cb(7, 3) === 28);
    console.log(cb(3, 2) === 3);
    console.log(cb(2, 3) === 3);
  };

  testingWith(uniquePathsDpSquaredSpace);
  testingWith(uniquePathsDpLinearSpace);
  testingWith(uniquePathsMathematics);

  console.log('All Testing Passed ✅');
})();
