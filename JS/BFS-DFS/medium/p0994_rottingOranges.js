// @ts-check

// 題目鏈結
// https://leetcode.com/problems/rotting-oranges

// 題目說明
// You are given an m x n grid where each cell can have one of three values:
// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
//

// Example 1:
// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
//

// Example 2:
// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
//

// Example 3:
// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
//

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// grid[i][j] is 0, 1, or 2.
//

// 解題重點
// 1. 瞭解DFS與BFS。
// 2. 此題本題屬於BFS走訪2D-Array的基本題型。
// 3. JS本身無 queue 的數據結構，應能使用"折衷辦法"來達到效果。並思考其對時間與空間複雜度的影響。

// 解題思路
// 1. 先找尋已經腐敗橘子位置(r,c)，並計算剩餘的新鮮橘子數量(fresh)
// 2. 再使用 BFS 一步一步讓橘子腐敗(grid[r][c]=2)，最終計算讓所有橘子腐敗的時間。

/**
 * Solution : 使用 BFS 走訪
 *
 * 使用 BFS 走訪
 * 1. 首先將腐敗的橘子位址放入queue中，並統計剩餘的新鮮橘子數量(fresh)
 * 2. 每次根據腐敗的橘子位址，分別再由上、下、左、右四個方向去搜尋。
 * 3. 承2, 搜尋時驗證該位址是否已經超出範圍與是否為新鮮的橘子(isvalid)
 *    若是，則腐爛時間(count)加一；且使其腐敗(grid[r][c] = 2)，新鮮橘子數量(fresh)遞減。
 * 4. bfs結束時，若橘子全部腐敗，返回腐爛時間(count)；若尚有新鮮橘子(fresh > 0)，返回 -1。
 * 
 * 時間複雜度: 所以grid中的元素都會被檢查。為 O(mn)
 * 空間複雜度: 以最糟狀況來看，grid中所有元素皆是2，起始的 queue大小為 mn 個，故為 O(mn) 
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N)  // N, grid中所有的元素數量
 * Space Complexity: O(mn) ≓ O(N)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRottingBFS = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const isvalid = (r, c) => {
    return r >= 0 && r < m && c >= 0 && c < n && grid[r][c] === 1;
  };
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [];

  let count = 0; //全部的橘子腐爛時間
  let fresh = 0; //剩餘的新鮮橘子數量

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        //腐爛的橘子位址
        queue.push([i, j, 0]);
      } else if (grid[i][j] === 1) {
        //新鮮橘子數量
        fresh += 1;
      }
    }
  }

  // 由於每次 queue 執行完都會清空，可以這樣使用。
  // while (queue.length > 0) {
  //   for (let i=0, qn=queue.length; i<qn; i++) {
  //       const [r, c, t] = queue.shift();
  //       for (const [dr, dc] of directions) {

  while (queue.length > 0) {
    const [sr, sc, t] = queue.shift();
    for (const [dr, dc] of directions) {
      const r = sr + dr;
      const c = sc + dc;
      if (isvalid(r, c)) {
        // 橘子腐敗，避免重覆計數
        grid[r][c] = 2;
        count = t + 1; // 只會增加
        fresh -= 1;
        queue.push([r, c, count]);
      }
    }
  }

  // 仍有新鮮橘子還沒腐敗返回-1；反之，返回腐爛時間(count)。
  return fresh !== 0 ? -1 : count;
};

// 測試
(function () {
  console.log("Testing [p0994_rottingOranges]...");

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(
      cb([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1],
      ]) === 4
    );
    console.log(
      cb([
        [2, 1, 1],
        [0, 1, 1],
        [1, 0, 1],
      ]) === -1
    );
    console.log(
      cb([
        [2, 0, 0, 0, 0],
        [1, 1, 0, 0, 2],
        [0, 1, 1, 1, 1],
        [0, 1, 0, 0, 1],
      ]) === 4
    );
    console.log(cb([[0, 2]]) === 0);
  };

  testingWith(orangesRottingBFS);

  console.log("All Testing Passed ✅");
})();
