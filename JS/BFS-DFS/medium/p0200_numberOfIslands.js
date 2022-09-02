// @ts-check

// 題目鏈結
// https://leetcode.com/problems/number-of-islands

// 題目說明
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
//

// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
//

// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3
//

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] is '0' or '1'.
//

// 解題重點
// 1. 瞭解 BFS，並使用其來求解。屬於基礎BFS走訪2D-Array的題型。

// 解題思路
// 1. 外層對整個 grid 進行搜尋，若查找的值為陸地(grid[i][j] === '1')進行BFS
// 2. 承1, 逐點使用BFS走訪時，把走訪過的點設值成'2'(非島嶼)，避免重覆查詢。

/**
 * Solution : 使用 DFS
 *
 * 空間複雜度
 * 對比BFS，DFS 執行時需要stack儲存狀態，最糟狀況便是grid上全是1，需走訪整個所有元素，故為O(mn)
 * 雖然起始點固定為左上角，但島嶼的形狀不固定，無法確定走訪順序，無法進一步對空間複雜度優化。
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N) // N, gird上的所有的元素數
 * Space Complexity: O(mn) ≓ O(N)
 *
 * @param {string[][]} grid
 * @return {number}
 */
var numIslandsDFS = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  let res = 0;

  const dfs = function (grid, r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (grid[r][c] !== "1") return;
    grid[r][c] = "2";

    for (let i = 0; i < 4; i++) {
      dfs(grid, r + dr[i], c + dc[i]); // 當走到底時，仍需要回溯檢查島嶼邊界。
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        res += 1;
        dfs(grid, i, j);
      }
    }
  }

  return res;
};

/**
 * Solution : 使用 BFS
 * 
 * 空間複雜度分析
 * 由於 BFS 執行時，需要額外的 queue 空間，最糟狀況便是grid上全是1，但是起始點固定從左上角開始，
 * 結束於右下角，其最大長度將為 min(m,n)+1，取 O(min(m,n))。 (此題可以對比 p0733來看)
 * 
 * 
 *  n = 2, m = 5,
 *  max length of queue is 3.
 * 
 *   2,2,①,1,1
 *   ①,①,1,1,1    // ① : 放入 queue 中的位址
 * 
 * 
 *  n = 5, m = 2
 *  max length of queue is 3.
 * 
 *   2,①,  
 *   2,①,
 *   ①,1,
 *   1,1,
 *   1,1,        // ① 表示放入 queue 中的位址
 * 
 *
 * 複雜度
 * Time Complexity : O(mn) ≓ O(N) // N, gird上的所有的元素數量
 * Space Complexity: O(mn) ≓ O(min(m,n))
 *
 * @param {string[][]} grid
 * @return {number}
 */
var numIslandsBFS = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dr = [1, 0, 0, -1];
  const dc = [0, 1, -1, 0];
  let res = 0;

  const bfs = function (grid, sr, sc) {
    grid[sr][sc] = "2";
    const queue = [[sr, sc]];

    while (queue.length > 0) {
      const [sr, sc] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const r = sr + dr[i];
        const c = sc + dc[i];
        if (r < 0 || r >= m || c < 0 || c >= n) continue;
        if (grid[r][c] !== "1") continue;
        grid[r][c] = "2";
        queue.push([r, c]);
      }
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        res += 1;
        bfs(grid, i, j);
      }
    }
  }

  return res;
};

// 測試
(function () {
  console.log("Testing [p0200_numberOfIslands]...");

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(
      cb([
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
      ]) === 1
    );
    console.log(
      cb([
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
      ]) === 3
    );
    console.log(
      cb([
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "1"],
        ["0", "0", "0", "1", "1"],
      ]) === 2
    );
    console.log(
      cb([
        ["1", "1", "1"],
        ["0", "1", "0"],
        ["0", "1", "0"],
      ]) === 1
    );
  };

  testingWith(numIslandsDFS);
  testingWith(numIslandsBFS);

  console.log("All Testing Passed ✅");
})();
